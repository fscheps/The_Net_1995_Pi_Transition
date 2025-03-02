import React, { useState } from 'react';
import { AudioEffect } from './AudioEffect';

/**
 * PiIcon Component
 * 
 * Creates a custom pi symbol that resembles the one shown in "The Net" movie.
 * Uses two T characters positioned together to create a pi-like appearance.
 * Plays a click sound when the icon is clicked.
 * 
 * @param onClick - Function to execute when the icon is clicked
 * @param glowing - Whether the icon should have a glowing animation effect
 */
interface PiIconProps {
  onClick: () => void;
  glowing?: boolean;
}

export const PiIcon: React.FC<PiIconProps> = ({ onClick, glowing = false }) => {
  const [playClickSound, setPlayClickSound] = useState(false);
  
  const handleClick = () => {
    setPlayClickSound(true);
    onClick();
  };
  
  return (
    <div 
      onClick={handleClick}
      className={`cursor-pointer p-2 transition-all duration-300 hover:opacity-80 ${
        glowing ? 'animate-pulse shadow-lg shadow-white/20' : ''
      }`}
    >
      {/* Custom pi symbol made of two touching Ts */}
      <div className="font-mono flex items-center justify-center relative">
        <span className="text-2xl font-bold text-white -mr-1">T</span>
        <span className="text-2xl font-bold text-white -ml-1">T</span>
      </div>
      
      {/* Click sound effect */}
      <AudioEffect
        src="/assets/sounds/click-151673.mp3"
        play={playClickSound}
        onEnded={() => setPlayClickSound(false)}
      />
    </div>
  );
};