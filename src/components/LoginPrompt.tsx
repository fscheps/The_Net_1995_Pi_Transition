import React, { useState, useEffect } from 'react';
import { PiIcon } from './PiIcon';
import { TypingEffect } from './TypingEffect';
import { AudioEffect } from './AudioEffect';

/**
 * LoginPrompt Component
 * 
 * Displays a movie-accurate login screen after the hacking sequence.
 * Always denies access attempts for authenticity.
 * After a delay, shows a mystery text and a second pi icon that triggers
 * another hacking sequence.
 * 
 * @param onClose - Function to close the prompt
 * @param onSecondHack - Function to trigger the second hacking sequence
 */
interface LoginPromptProps {
  onClose: () => void;
  onSecondHack: () => void;
}

export const LoginPrompt: React.FC<LoginPromptProps> = ({ onClose, onSecondHack }) => {
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showMysteryText, setShowMysteryText] = useState(false);
  const [mysteryTextComplete, setMysteryTextComplete] = useState(false);
  const [playClickSound, setPlayClickSound] = useState(false);
  
  // Show the mystery text after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMysteryText(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  /**
   * Handle login form submission
   * Always shows "ACCESS DENIED" for movie authenticity
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAttempts(prev => prev + 1);
    
    // Always show access denied for the movie effect
    setErrorMessage('ACCESS DENIED. Security protocols have been alerted.');
    
    // Clear the form after a failed attempt
    setTimeout(() => {
      setUsername('');
      setPassword('');
      
      // After 3 attempts, close the prompt
      if (attempts >= 2) {
        setErrorMessage('SECURITY BREACH DETECTED. Connection terminated.');
        setTimeout(onClose, 3000);
      }
    }, 2000);
  };
  
  const handlePiClick = () => {
    setPlayClickSound(true);
    onSecondHack();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-30">
      {/* Main login container */}
      <div className="w-full max-w-md p-8 border-2 border-green-500 bg-black text-green-500 rounded-md">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-mono">PRAETORIAN SECURE LOGIN</h2>
          <div className="w-4 h-4 bg-green-500 animate-pulse"></div>
        </div>
        
        {/* Error message display */}
        {errorMessage && (
          <div className="mb-6 p-3 border border-red-500 text-red-500 font-mono text-sm">
            {errorMessage}
          </div>
        )}
        
        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-mono text-sm mb-2">USER IDENTIFICATION:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-green-500 p-2 text-green-500 font-mono focus:outline-none focus:ring-1 focus:ring-green-700"
              autoFocus
            />
          </div>
          
          <div className="mb-6">
            <label className="block font-mono text-sm mb-2">ACCESS CODE:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-green-500 p-2 text-green-500 font-mono focus:outline-none focus:ring-1 focus:ring-green-700"
            />
          </div>
          
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-700 text-green-100 font-mono py-2 px-4 border border-green-600 focus:outline-none"
            >
              AUTHENTICATE
            </button>
            
            <div className="text-sm font-mono">
              SYSTEM: {attempts > 0 ? `${3 - attempts} ATTEMPTS REMAINING` : 'READY'}
            </div>
          </div>
        </form>
      </div>
      
      {/* Mystery text that appears after 2 seconds - outside the login box */}
      {showMysteryText && (
        <div className="mt-6 max-w-md text-center">
          <div className="text-green-400 font-mono text-sm italic">
            <TypingEffect 
              text="If you are old enough, you know exactly what this was about..." 
              typingSpeed={40}
              onComplete={() => setMysteryTextComplete(true)}
            />
          </div>
          
          {mysteryTextComplete && (
            <div className="mt-2 text-green-400 font-mono text-sm">
              <TypingEffect 
                text="Created by @FerTech" 
                typingSpeed={40} 
              />
            </div>
          )}
        </div>
      )}
      
      {/* Pi icon in the bottom right corner that glows */}
      {showMysteryText && (
        <div className="absolute bottom-4 right-4">
          <PiIcon onClick={handlePiClick} glowing={true} />
        </div>
      )}

      {/* Click sound for pi icon */}
      <AudioEffect
        src="/assets/sounds/click-151673.mp3"
        play={playClickSound}
        onEnded={() => setPlayClickSound(false)}
      />
    </div>
  );
};