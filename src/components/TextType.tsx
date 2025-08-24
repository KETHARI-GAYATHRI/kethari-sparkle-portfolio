import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface TextTypeProps {
  text: string | string[];
  className?: string;
  typingSpeed?: number; // base typing delay in ms
  initialDelay?: number; // ms before the very first character of a sequence
  pauseDuration?: number; // ms to wait after finishing typing before deleting
  deletingSpeed?: number; // base deleting delay in ms
  loop?: boolean;
  showCursor?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  variableSpeed?: { min: number; max: number }; // optional explicit jitter range for typing
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
}

export const TextType = ({
  text,
  className = '',
  typingSpeed = 75,
  initialDelay = 0,
  pauseDuration = 1500,
  deletingSpeed = 50,
  loop = true,
  showCursor = true,
  cursorCharacter = '|',
  cursorBlinkDuration = 0.5,
  cursorClassName = '',
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
}: TextTypeProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [currentText, setCurrentText] = useState('');
  const [isVisible, setIsVisible] = useState(!startOnVisible);

  // Timeline for cursor blink
  const animationRef = useRef<GSAPTimeline | null>(null);

  // Track all active timeouts to avoid leaks/overlaps (especially under React Strict Mode)
  const timeoutsRef = useRef<number[]>([]);
  const addTimeout = (fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timeoutsRef.current.push(id);
    return id;
  };
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  };

  // Generation guard to cancel stale typing/deleting loops across re-renders
  const generationRef = useRef(0);

  const texts = Array.isArray(text) ? text : [text];

  // Helper to jitter around speeds for more natural feel
  const randBetween = (min: number, max: number) => Math.random() * (max - min) + min;

  const getRandomTypingDelay = useCallback(() => {
    if (variableSpeed) return randBetween(variableSpeed.min, variableSpeed.max);
    // Default: jitter around the base typingSpeed by ±20%
    const jitter = 0.2;
    return randBetween(typingSpeed * (1 - jitter), typingSpeed * (1 + jitter));
  }, [variableSpeed, typingSpeed]);

  const getRandomDeletingDelay = useCallback(() => {
    const jitter = 0.15;
    return randBetween(deletingSpeed * (1 - jitter), deletingSpeed * (1 + jitter));
  }, [deletingSpeed]);

  const typeText = useCallback(
    (textToType: string, index: number, localGen: number) => {
      if (!textRef.current) return;

      let charIndex = 0;
      const chars = textToType.split('');

      const typeChar = () => {
        // Abort if this loop is stale
        if (generationRef.current !== localGen) return;
        if (charIndex < chars.length) {
          setCurrentText(textToType.substring(0, charIndex + 1));
          charIndex++;
          addTimeout(typeChar, getRandomTypingDelay());
        } else {
          onSentenceComplete?.(textToType, index);
          // Proceed to delete if there are more texts or loop is enabled
          if (texts.length > 1 || loop) {
            addTimeout(() => {
              deleteText(index, localGen);
            }, pauseDuration);
          }
        }
      };

      // Start typing after initial delay only at the beginning of a sequence
      addTimeout(typeChar, initialDelay);
    },
    [getRandomTypingDelay, initialDelay, pauseDuration, onSentenceComplete, texts.length, loop]
  );

  const deleteText = useCallback(
    (currentIndex: number, localGen: number) => {
      if (!textRef.current) return;

      // Snapshot current content at the start of deletion
      const snapshot = textRef.current.textContent || '';
      let charIndex = snapshot.length;

      const deleteChar = () => {
        if (generationRef.current !== localGen) return;
        if (charIndex > 0) {
          setCurrentText(snapshot.substring(0, charIndex - 1));
          charIndex--;
          addTimeout(deleteChar, getRandomDeletingDelay());
        } else {
          const nextIndex = (currentIndex + 1) % texts.length;
          if (nextIndex !== 0 || loop) {
            // Small natural pause before next word begins
            addTimeout(() => typeText(texts[nextIndex], nextIndex, localGen), Math.max(120, typingSpeed * 0.8));
          }
        }
      };

      deleteChar();
    },
    [getRandomDeletingDelay, texts, loop, typingSpeed, typeText]
  );

  // Kick off typing when visible
  useEffect(() => {
    if (!isVisible || texts.length === 0) return;

    // Cancel any previous loops/timers, then start a new generation
    clearAllTimeouts();
    generationRef.current += 1;
    const localGen = generationRef.current;

    typeText(texts[0], 0, localGen);

    return () => {
      // Cleanup all timeouts on unmount or dependency change
      clearAllTimeouts();
    };
  }, [isVisible, texts, typeText]);

  // Cursor blink managed by GSAP for consistent timing
  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;

    const cursor = cursorRef.current;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(cursor, {
      opacity: 0,
      duration: cursorBlinkDuration,
      ease: 'power2.inOut',
    });

    animationRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [showCursor, cursorBlinkDuration]);

  // Visibility-on-scroll support
  useEffect(() => {
    if (!startOnVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) observer.observe(textRef.current);
    return () => observer.disconnect();
  }, [startOnVisible, isVisible]);

  return (
    <span className={className}>
      <span ref={textRef}>{currentText}</span>
      {showCursor && (
        <span ref={cursorRef} className={`inline-block ${cursorClassName}`}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};