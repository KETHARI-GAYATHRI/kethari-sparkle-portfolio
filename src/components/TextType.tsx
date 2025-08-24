import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface TextTypeProps {
  text: string | string[];
  className?: string;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  variableSpeed?: {min: number, max: number};
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
  const animationRef = useRef<GSAPTimeline | null>(null);

  const texts = Array.isArray(text) ? text : [text];

  const getRandomSpeed = useCallback(() => {
    if (variableSpeed) {
      return Math.random() * (variableSpeed.max - variableSpeed.min) + variableSpeed.min;
    }
    return typingSpeed;
  }, [variableSpeed, typingSpeed]);

  const typeText = useCallback((textToType: string, index: number) => {
    if (!textRef.current) return;

    let charIndex = 0;
    const chars = textToType.split('');
    
    const typeChar = () => {
      if (charIndex < chars.length) {
        setCurrentText(textToType.substring(0, charIndex + 1));
        charIndex++;
        setTimeout(typeChar, getRandomSpeed());
      } else {
        onSentenceComplete?.(textToType, index);
        
        if (texts.length > 1 || loop) {
          setTimeout(() => {
            deleteText(index);
          }, pauseDuration);
        }
      }
    };

    setTimeout(typeChar, initialDelay);
  }, [getRandomSpeed, initialDelay, pauseDuration, onSentenceComplete, texts.length, loop]);

  const deleteText = useCallback((currentIndex: number) => {
    if (!textRef.current) return;

    const currentTextValue = textRef.current.textContent || '';
    let charIndex = currentTextValue.length;

    const deleteChar = () => {
      if (charIndex > 0) {
        setCurrentText(currentTextValue.substring(0, charIndex - 1));
        charIndex--;
        setTimeout(deleteChar, deletingSpeed);
      } else {
        const nextIndex = (currentIndex + 1) % texts.length;
        if (nextIndex !== 0 || loop) {
          setTimeout(() => typeText(texts[nextIndex], nextIndex), typingSpeed);
        }
      }
    };

    deleteChar();
  }, [deletingSpeed, texts, loop, typingSpeed, typeText]);

  useEffect(() => {
    if (!isVisible) return;

    if (texts.length > 0) {
      typeText(texts[0], 0);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [isVisible, texts, typeText]);

  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;

    const cursor = cursorRef.current;
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(cursor, {
      opacity: 0,
      duration: cursorBlinkDuration,
      ease: "power2.inOut"
    });

    animationRef.current = tl;

    return () => {
      tl.kill();
    };
  }, [showCursor, cursorBlinkDuration]);

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

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [startOnVisible, isVisible]);

  return (
    <span className={className}>
      <span ref={textRef}>{currentText}</span>
      {showCursor && (
        <span 
          ref={cursorRef}
          className={`inline-block ${cursorClassName}`}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};