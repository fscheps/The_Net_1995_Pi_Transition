import React, { useState, useEffect } from 'react';

/**
 * TypingEffect Component
 * 
 * Creates a typewriter effect for the given text string.
 * 
 * @param text - The text to be typed out
 * @param typingSpeed - Speed of typing in milliseconds
 * @param showCursor - Whether to show the blinking cursor
 * @param onComplete - Callback function when typing is complete
 */
interface TypingEffectProps {
  text: string;
  typingSpeed?: number;
  showCursor?: boolean;
  onComplete?: () => void;
}

export const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  typingSpeed = 100,
  showCursor = true,
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      // Set up the timer for typing effect
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else if (!isComplete) {
      // Typing is complete
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, typingSpeed, isComplete, onComplete]);

  return (
    <span className="inline-flex items-center">
      {displayedText}
      {showCursor && (
        <span className={`animate-blink ml-1 ${isComplete ? 'inline-block' : 'hidden'}`}>_</span>
      )}
    </span>
  );
};