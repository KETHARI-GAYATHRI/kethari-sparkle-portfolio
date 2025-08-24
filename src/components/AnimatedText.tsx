import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const AnimatedText = ({ text, className = '', delay = 50 }: AnimatedTextProps) => {
  const [animatedText, setAnimatedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setAnimatedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setAnimatedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, delay]);

  return (
    <span className={className}>
      {animatedText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  );
};

interface LetterAnimationProps {
  text: string;
  className?: string;
  stagger?: number;
}

export const LetterAnimation = ({ text, className = '', stagger = 100 }: LetterAnimationProps) => {
  const [visibleLetters, setVisibleLetters] = useState(0);

  useEffect(() => {
    setVisibleLetters(0);
    const timer = setTimeout(() => {
      setVisibleLetters(text.length);
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <span className={className}>
      {text.split('').map((letter, index) => (
        <span
          key={index}
          className={`letter-animate ${index < visibleLetters ? 'opacity-100' : 'opacity-0'}`}
          style={{
            animationDelay: `${index * stagger}ms`,
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
};