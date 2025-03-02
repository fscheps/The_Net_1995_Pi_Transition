import React, { useState, useEffect } from 'react';
import { PiIcon } from './components/PiIcon';
import { HackingSequence } from './components/HackingSequence';
import { LoginPrompt } from './components/LoginPrompt';
import { TypingEffect } from './components/TypingEffect';
import { AudioEffect } from './components/AudioEffect';

/**
 * Main Application Component
 * 
 * Recreates the iconic hacking scene from "The Net" movie (1995)
 * With several distinct phases:
 * 1. Intro screen with typing effect and pi icon
 * 2. First hacking sequence animation
 * 3. Login prompt with "forbidden access" feel
 * 4. Second (optional) hacking sequence with redirect
 */
function App() {
  // State to control which screens are visible
  const [isHacking, setIsHacking] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isSecondHack, setIsSecondHack] = useState(false);
  const [introTypingComplete, setIntroTypingComplete] = useState(false);
  const [playClickSound, setPlayClickSound] = useState(false);
  const [playTransitionSound, setPlayTransitionSound] = useState(false);
  
  /**
   * Start the first hacking sequence when pi icon is clicked
   */
  const startHackingSequence = () => {
    setPlayClickSound(true);
    setPlayTransitionSound(true);
    setIsHacking(true);
    
    // After the hacking sequence completes, show the login prompt
    setTimeout(() => {
      setIsHacking(false);
      setPlayTransitionSound(false);
      setShowLogin(true);
    }, 8000); // 8 seconds animation duration
  };
  
  /**
   * Start the second hacking sequence that redirects to an external URL
   */
  const startSecondHackingSequence = () => {
    setPlayClickSound(true);
    setPlayTransitionSound(true);
    setShowLogin(false);
    setIsSecondHack(true);
    // This sequence will automatically redirect to the URL when complete
  };

  // Ensure sounds are stopped when components unmount
  useEffect(() => {
    return () => {
      setPlayClickSound(false);
      setPlayTransitionSound(false);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Normal content - The intro screen */}
      {!isHacking && !showLogin && !isSecondHack && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 font-mono flex items-center justify-center">
              <TypingEffect 
                text="The Internet in 1995" 
                typingSpeed={120}
                onComplete={() => setIntroTypingComplete(true)}
              />
            </h1>
          </div>
        </div>
      )}
      
      {/* Pi icon trigger (lower right corner) */}
      {!isHacking && !showLogin && !isSecondHack && introTypingComplete && (
        <div className="absolute bottom-4 right-4">
          <PiIcon onClick={startHackingSequence} />
        </div>
      )}
      
      {/* First hacking sequence animation */}
      {isHacking && <HackingSequence faster={true} />}
      
      {/* Login prompt */}
      {showLogin && <LoginPrompt onClose={() => setShowLogin(false)} onSecondHack={startSecondHackingSequence} />}
      
      {/* Second hacking sequence with redirect */}
      {isSecondHack && <HackingSequence faster={true} redirectUrl="https://twitter.com/fertech" />}
      
      {/* Sound effects */}
      <AudioEffect
        src="/assets/sounds/click-151673.mp3"
        play={playClickSound}
        onEnded={() => setPlayClickSound(false)}
      />
      
      {/* Footer - Made with love in Switzerland */}
      <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-center text-white/50">
        Made with ❤️ in Switzerland 🇨🇭 by SwissTechLab
      </div>
    </div>
  );
}

export default App;