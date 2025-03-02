import React, { useEffect, useState } from 'react';
import { AudioEffect } from './AudioEffect';

// Define the screens we'll cycle through based on the movie screenshots
const serverScreens = [
  { 
    name: "UNAUTHORIZED ACCESS", 
    type: "warning",
    text: "SECURITY ALERT\nPROTOCOL VIOLATION\nSYSTEM INTRUSION DETECTED",
    color: "text-white bg-red-600"
  },
  { 
    name: "GATEWAY FILE SYSTEM", 
    type: "desktop",
    text: "Loading system files...\nAccessing restricted directories\nOverriding security protocols\nAdmin privileges acquired",
    color: "text-black bg-gray-200"
  },
  { 
    name: "SATELLITE UPLINK", 
    type: "satellite",
    text: "CONNECTING TO ORBITAL ARRAY\nSIGNAL ACQUISITION: 78%\nBYPASSING ENCRYPTION\nLINK ESTABLISHED",
    color: "text-blue-200 bg-blue-900"
  },
  { 
    name: "CODE INTRUSION", 
    type: "matrix",
    text: "INJECTING PAYLOAD\nBREAKING ENCRYPTION\nFIREWALL BYPASSED\nACCESS GRANTED",
    color: "text-green-400 bg-black"
  },
  { 
    name: "FINANCIAL DATABASE", 
    type: "database",
    text: "CLIENT DATA ACCESSED\nACCOUNT: 458-90223\nBALANCE: $837,000\nTRANSFERRING FUNDS...",
    color: "text-white bg-blue-700"
  },
  { 
    name: "SERVER ACCESS", 
    type: "code",
    text: "EXECUTING CODE INJECTION\nBYPASSING FIREWALL\nDISABLING SECURITY TRACE\nSYSTEM COMPROMISED",
    color: "text-green-400 bg-black"
  },
  { 
    name: "DOD SECURE NETWORK", 
    type: "military",
    text: "PENTAGON DATABASE\nSECURITY LEVEL: ALPHA\nBREACHING DEFENSE GRID\nACCESS GRANTED",
    color: "text-amber-400 bg-stone-900"
  },
  { 
    name: "RESTRICTED FILES", 
    type: "blueprint",
    text: "ACCESSING CLASSIFIED DATA\nMILITARY SCHEMATICS FOUND\nDOWNLOADING TECHNICAL SPECS\nEXTRACTION COMPLETE",
    color: "text-blue-300 bg-slate-900"
  },
  { 
    name: "NETWORK INTRUSION", 
    type: "matrix",
    text: "DECRYPTING PROTOCOLS\nBYPASSING AUTHENTICATION\nACCESSING ROOT NETWORK\nMAIN FRAME BREACHED",
    color: "text-green-500 bg-black"
  },
  { 
    name: "GLOBAL TRACKING", 
    type: "map",
    text: "LOCATION SERVICES ENABLED\nTRIANGULATING COORDINATES\nTARGET IDENTIFIED\nPROXIMITY ALERT",
    color: "text-green-300 bg-green-950"
  },
  { 
    name: "ENCRYPTED CHANNEL", 
    type: "matrix",
    text: "SECURE CONNECTION ESTABLISHED\nROUTING THROUGH PROXIES\nENCRYPTION LEVEL: MAXIMUM\nDATA STREAM SECURED",
    color: "text-purple-400 bg-black"
  },
  { 
    name: "PRAETORIAN SYSTEM", 
    type: "terminal",
    text: "CONNECTING TO MOZART'S GHOST\nSECURE CHANNEL ESTABLISHED\nVERIFYING IDENTITY...\nWELCOME TO PRAETORIAN",
    color: "text-purple-500 bg-black"
  }
];

interface HackingSequenceProps {
  redirectUrl?: string; // URL to redirect for second hacking sequence
  faster?: boolean; // Flag to make the sequence even faster
}

export const HackingSequence: React.FC<HackingSequenceProps> = ({ 
  redirectUrl,
  faster = false
}) => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [visibleText, setVisibleText] = useState("");
  const [playTransitionSound, setPlayTransitionSound] = useState(true);
  
  // Redirect after sequence if URL is provided
  useEffect(() => {
    if (redirectUrl && currentScreen >= serverScreens.length) {
      // This URL can be changed to point to a specific X post explaining what this was about
      // Right now it points to @fertech profile as requested
      window.location.href = redirectUrl;
    }
  }, [currentScreen, redirectUrl]);
  
  // Stop sound when sequence ends
  useEffect(() => {
    if (currentScreen >= serverScreens.length) {
      setPlayTransitionSound(false);
    }
  }, [currentScreen]);
  
  // Use separate useEffect for screen transitions
  useEffect(() => {
    // End the sequence if we've gone through all screens
    if (currentScreen >= serverScreens.length) return;
    
    // Reset text when moving to a new screen
    setVisibleText("");
    
    let currentText = "";
    let charIndex = 0;
    const currentScreenText = serverScreens[currentScreen].text;
    
    // Create typing effect - even faster for second sequence
    const typingSpeed = faster ? 12 : 16; // Reduced from 20ms to make it faster
    
    const typingInterval = setInterval(() => {
      if (charIndex < currentScreenText.length) {
        currentText += currentScreenText.charAt(charIndex);
        setVisibleText(currentText);
        charIndex++;
      } else {
        // Clear typing interval once text is complete
        clearInterval(typingInterval);
        
        // Move to next screen after delay - shorter delay for faster experience
        const nextScreenDelay = faster ? 300 : 450; // Reduced from 600ms
        
        const nextScreenTimer = setTimeout(() => {
          setCurrentScreen(prev => prev + 1);
        }, nextScreenDelay);
        
        return () => clearTimeout(nextScreenTimer);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, [currentScreen, faster]);
  
  // Generate random code for matrix effect
  const generateRandomCode = () => {
    const codeLines = [];
    for (let i = 0; i < 30; i++) { // Increased from 20 to 30 for more density
      let line = "";
      const length = Math.floor(Math.random() * 50) + 10;
      for (let j = 0; j < length; j++) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";
        line += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      codeLines.push(line);
    }
    return codeLines;
  };
  
  // Financial data for the "database" screen
  const generateFinancialData = () => {
    const accounts = [
      { id: "A-45892", name: "Devlin McGregor", amount: "$2,450,000" },
      { id: "B-11458", name: "Nexus Systems", amount: "$837,450" },
      { id: "C-77392", name: "Angela Bennett", amount: "$145,230" },
      { id: "D-98123", name: "Jack Devlin", amount: "$4,981,200" },
      { id: "E-33781", name: "Gregor Assets", amount: "$992,100" }
    ];
    return accounts;
  };
  
  // File system icons for the "desktop" screen
  const fileSystemIcons = [
    { name: "User Files", type: "folder" },
    { name: "System32", type: "folder" },
    { name: "Network", type: "network" },
    { name: "Database", type: "database" },
    { name: "Security", type: "lock" },
    { name: "Trash", type: "trash" }
  ];
  
  if (currentScreen >= serverScreens.length) {
    return null; // End of sequence
  }

  // Create different screen designs based on the type
  let screenContent;
  const currentScreenData = serverScreens[currentScreen];
  const randomCode = generateRandomCode();
  
  switch (currentScreenData.type) {
    case "warning":
      screenContent = (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className={`w-full h-full flex items-center justify-center ${currentScreenData.color} p-8`}>
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-6">{currentScreenData.name}</h1>
              <div className="font-mono text-2xl">
                {visibleText.split('\n').map((line, index) => (
                  <p key={index} className="mb-4">
                    {line}
                    {index === visibleText.split('\n').length - 1 && 
                      <span className="animate-blink">_</span>
                    }
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
      break;
      
    case "desktop":
      screenContent = (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className={`${currentScreenData.color} p-4 w-full h-full flex flex-col`}>
            <div className="bg-blue-800 text-white p-2 flex justify-between items-center mb-4">
              <span>{currentScreenData.name}</span>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="flex-1 flex">
              <div className="w-1/4 bg-gray-300 p-2 border-r border-gray-400">
                {fileSystemIcons.map((icon, idx) => (
                  <div key={idx} className="mb-4 flex items-center">
                    <div className="w-8 h-8 bg-blue-600 flex items-center justify-center text-white mr-2">
                      {icon.type === 'folder' ? '📁' : 
                       icon.type === 'network' ? '🌐' : 
                       icon.type === 'database' ? '💾' : 
                       icon.type === 'lock' ? '🔒' : '🗑️'}
                    </div>
                    <span className="text-sm">{icon.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex-1 p-4">
                <div className="font-mono text-md">
                  {visibleText.split('\n').map((line, index) => (
                    <p key={index} className="mb-2 text-black">
                      {line}
                      {index === visibleText.split('\n').length - 1 && 
                        <span className="animate-blink">_</span>
                      }
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      break;
      
    case "database":
      const financialData = generateFinancialData();
      screenContent = (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className={`${currentScreenData.color} p-4 w-full h-full flex flex-col`}>
            <div className="flex justify-between items-center mb-4 border-b border-blue-300 pb-2">
              <h2 className="text-xl font-bold">
                {currentScreenData.name}
              </h2>
              <div className="px-2 py-1 bg-yellow-400 text-black text-xs">RESTRICTED ACCESS</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border border-blue-300 p-2">
                <h3 className="text-sm border-b border-blue-300 pb-1 mb-2">Client Accounts</h3>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-blue-300">
                      <th className="text-left p-1">ID</th>
                      <th className="text-left p-1">Client</th>
                      <th className="text-right p-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financialData.map((account, idx) => (
                      <tr key={idx} className="border-b border-blue-300">
                        <td className="p-1">{account.id}</td>
                        <td className="p-1">{account.name}</td>
                        <td className="p-1 text-right">{account.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="border border-blue-300 p-2">
                <h3 className="text-sm border-b border-blue-300 pb-1 mb-2">System Log</h3>
                <div className="font-mono text-xs h-40 overflow-hidden">
                  {visibleText.split('\n').map((line, index) => (
                    <p key={index} className="mb-1">
                      {line}
                      {index === visibleText.split('\n').length - 1 && 
                        <span className="animate-blink">_</span>
                      }
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-auto border-t border-blue-300 pt-2 flex justify-between text-xs">
              <span>Server: FINANCIAL-MAIN</span>
              <span>Access Level: ADMINISTRATOR</span>
              <span>Connection: SECURE</span>
            </div>
          </div>
        </div>
      );
      break;
      
    case "satellite":
      screenContent = (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className={`w-full h-full ${currentScreenData.color} flex flex-col p-4 overflow-hidden`}>
            {/* Satellite graphic in the background */}
            <div className="absolute inset-0 overflow-hidden opacity-30">
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-40 h-40 border-2 border-blue-200 rounded-full" />
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-60 h-60 border border-blue-300 rounded-full" />
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-20 h-40 border-2 border-blue-200" />
              <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-400" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-400" />
            </div>
            
            <div className="bg-blue-800 text-white p-2 flex justify-between items-center mb-4 z-10">
              <h2 className="text-xl font-bold">{currentScreenData.name}</h2>
              <div className="px-2 py-1 bg-red-500 text-white text-xs animate-pulse">LIVE CONNECTION</div>
            </div>
            
            <div className="flex-1 flex justify-center items-center z-10">
              <div className="p-6 bg-blue-900/70 rounded-lg border border-blue-400 max-w-2xl">
                <div className="font-mono text-lg">
                  {visibleText.split('\n').map((line, index) => (
                    <p key={index} className="mb-2">
                      {line}
                      {index === visibleText.split('\n').length - 1 && 
                        <span className="animate-blink">_</span>
                      }
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-xs z-10">
              <span>Orbital Position: 43.2°N 78.9°W</span>
              <span>Signal Strength: ▮▮▮▮▮▯▯</span>
              <span>Encryption: Bypassed</span>
            </div>
          </div>
        </div>
      );
      break;
      
    case "code":
      screenContent = (
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
          {/* Matrix-like code effect */}
          <div className="absolute inset-0 overflow-hidden">
            {randomCode.map((line, index) => (
              <div 
                key={index} 
                className="text-green-500 text-xs font-mono whitespace-nowrap animate-matrix-fall"
                style={{ 
                  animationDuration: `${Math.random() * 8 + 3}s`, 
                  animationDelay: `${Math.random() * 2}s`,
                  left: `${index * 5}%`
                }}
              >
                {line}
              </div>
            ))}
          </div>
          
          {/* Overlaying text */}
          <div className="relative z-10 text-center max-w-lg p-6 bg-black/60 rounded">
            <div className="font-mono text-md">
              {visibleText.split('\n').map((line, index) => (
                <p key={index} className="text-green-500 mb-2 text-xl">
                  {line}
                  {index === visibleText.split('\n').length - 1 && 
                    <span className="animate-blink">_</span>
                  }
                </p>
              ))}
            </div>
          </div>
        </div>
      );
      break;

    case "military":
      screenContent = (
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
          <div className={`w-full h-full ${currentScreenData.color} flex flex-col p-4`}>
            {/* Military header */}
            <div className="bg-amber-900 text-amber-400 p-3 flex justify-between items-center mb-6 border-b-2 border-amber-600">
              <h2 className="text-xl font-mono font-bold">
                {currentScreenData.name}
              </h2>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse mr-2"></div>
                <span className="text-xs">TOP SECRET</span>
              </div>
            </div>
            
            {/* Striped background */}
            <div className="absolute inset-0 z-0 opacity-20">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute h-8 bg-amber-500/30"
                  style={{ 
                    left: 0, 
                    right: 0,
                    top: `${i * 40}px`,
                  }}
                ></div>
              ))}
            </div>
            
            {/* Main content */}
            <div className="flex justify-center items-center flex-1 z-10">
              <div className="bg-stone-800 border-2 border-amber-600 rounded p-6 max-w-xl">
                <div className="flex justify-between mb-4">
                  <span className="text-amber-400 text-sm">CLASSIFIED</span>
                  <span className="text-amber-400 text-sm">SCI-LEVEL 5</span>
                </div>
                <div className="font-mono text-lg">
                  {visibleText.split('\n').map((line, index) => (
                    <p key={index} className="mb-2 text-amber-400">
                      {line}
                      {index === visibleText.split('\n').length - 1 && 
                        <span className="animate-blink">_</span>
                      }
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      break;
      
    case "blueprint":
      screenContent = (
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
          {/* Blueprint background */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden opacity-30">
            <div className="w-[120%] h-[120%] border-4 border-blue-300 rounded-full flex items-center justify-center">
              <div className="w-[80%] h-[80%] border-2 border-blue-300 rounded-full flex items-center justify-center">
                <div className="w-[60%] h-[60%] border border-blue-300 rounded-full"></div>
              </div>
            </div>
            
            {/* Grid lines */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={`v-${i}`} 
                  className="absolute top-0 bottom-0 w-px bg-blue-300/30"
                  style={{ left: `${(i + 1) * 5}%` }}
                ></div>
              ))}
              {[...Array(20)].map((_, i) => (
                <div 
                  key={`h-${i}`} 
                  className="absolute left-0 right-0 h-px bg-blue-300/30"
                  style={{ top: `${(i + 1) * 5}%` }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Overlaying text */}
          <div className="relative z-10 text-center max-w-lg p-6 bg-slate-900/80 rounded">
            <h2 className="text-xl font-bold text-blue-300 mb-4">{currentScreenData.name}</h2>
            <div className="font-mono">
              {visibleText.split('\n').map((line, index) => (
                <p key={index} className="text-blue-300 mb-2">
                  {line}
                  {index === visibleText.split('\n').length - 1 && 
                    <span className="animate-blink">_</span>
                  }
                </p>
              ))}
            </div>
          </div>
        </div>
      );
      break;
    
    case "map":
      screenContent = (
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
          <div className={`w-full h-full ${currentScreenData.color} flex flex-col`}>
            {/* Grid background */}
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div 
                  key={`v-${i}`} 
                  className="absolute top-0 bottom-0 w-px bg-green-500/20"
                  style={{ left: `${(i + 1) * 2.5}%` }}
                ></div>
              ))}
              {[...Array(40)].map((_, i) => (
                <div 
                  key={`h-${i}`} 
                  className="absolute left-0 right-0 h-px bg-green-500/20"
                  style={{ top: `${(i + 1) * 2.5}%` }}
                ></div>
              ))}
              
              {/* Map features */}
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-green-400/40 rounded-full"></div>
              <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 border border-green-400/40 rounded-full"></div>
              <div className="absolute top-[45%] left-[45%] w-[10%] h-[10%] border-2 border-red-500 rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-green-900 border-b border-green-600 z-10">
              <h2 className="text-xl font-bold text-green-300">{currentScreenData.name}</h2>
              <div className="text-xs text-green-300">GLOBAL POSITIONING SYSTEM</div>
            </div>
            
            <div className="flex-1 flex justify-center items-center z-10">
              <div className="bg-green-900/70 border border-green-500 rounded p-6 max-w-lg">
                <div className="font-mono text-lg">
                  {visibleText.split('\n').map((line, index) => (
                    <p key={index} className="text-green-300 mb-2">
                      {line}
                      {index === visibleText.split('\n').length - 1 && 
                        <span className="animate-blink">_</span>
                      }
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-2 flex justify-between text-green-400 text-xs bg-green-900/70 border-t border-green-600 z-10">
              <span>LAT: 37.7749° N</span>
              <span>LON: 122.4194° W</span>
              <span>ZOOM: 12x</span>
            </div>
          </div>
        </div>
      );
      break;
      
    case "matrix":
      // New dedicated matrix effect screen with more intense animations
      const matrixStrings = [];
      for (let i = 0; i < 60; i++) {
        const randomChars = Array.from({ length: Math.floor(Math.random() * 50) + 20 }, 
          () => "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".charAt(
            Math.floor(Math.random() * "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン".length)
          )).join('');
        matrixStrings.push(randomChars);
      }
      
      screenContent = (
        <div className="fixed inset-0 overflow-hidden bg-black">
          {/* Intense matrix rain effect */}
          <div className="absolute inset-0 overflow-hidden">
            {matrixStrings.map((str, idx) => (
              <div
                key={idx}
                className="absolute top-0 text-xs font-mono whitespace-nowrap text-green-500 opacity-80 animate-matrix-fall"
                style={{
                  left: `${idx * 1.8}%`,
                  animationDuration: `${Math.random() * 10 + 3}s`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              >
                {str}
              </div>
            ))}
          </div>
          
          {/* Central glowing content */}
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <div className="bg-black/70 border border-green-500 p-8 rounded-lg max-w-md shadow-lg shadow-green-500/20">
              <h2 className="text-green-500 text-2xl font-mono mb-4 font-bold">{currentScreenData.name}</h2>
              <div className="font-mono text-lg">
                {visibleText.split('\n').map((line, index) => (
                  <p key={index} className="text-green-500 mb-2">
                    {line}
                    {index === visibleText.split('\n').length - 1 && 
                      <span className="animate-blink">_</span>
                    }
                  </p>
                ))}
              </div>
            </div>
          </div>
          
          {/* Random floating characters for more matrix effect */}
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={`float-${i}`}
                className="absolute text-green-500 opacity-40 text-xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `blink ${Math.random() * 2 + 0.5}s infinite`
                }}
              >
                {"01アイウエオカキクケコ".charAt(Math.floor(Math.random() * 12))}
              </div>
            ))}
          </div>
        </div>
      );
      break;
      
    case "terminal":
    default:
      screenContent = (
        <div className="fixed inset-0 flex items-center justify-center z-20 overflow-hidden">
          {/* Random code in background */}
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            {randomCode.map((line, index) => (
              <div 
                key={index} 
                className="text-green-500 text-xs font-mono whitespace-nowrap animate-marquee"
                style={{ animationDuration: `${Math.random() * 10 + 5}s`, animationDelay: `${Math.random() * 2}s` }}
              >
                {line}
              </div>
            ))}
          </div>
          
          {/* Main terminal display */}
          <div className="relative z-10 w-4/5 max-w-3xl border-2 border-gray-700 bg-black p-6 rounded">
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
              <h2 className={`text-xl font-bold ${currentScreenData.color}`}>
                {currentScreenData.name}
              </h2>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div className="font-mono text-md">
              {visibleText.split('\n').map((line, index) => (
                <p key={index} className={`${currentScreenData.color} mb-2`}>
                  {line}
                  {index === visibleText.split('\n').length - 1 && 
                    <span className="animate-blink">_</span>
                  }
                </p>
              ))}
            </div>
          </div>
          
          {/* Visual server rack effect */}
          <div className="fixed top-0 left-0 w-full h-4 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 opacity-80"></div>
          <div className="fixed bottom-0 left-0 w-full h-4 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 opacity-80"></div>
        </div>
      );
  }

  return (
    <>
      {screenContent}
      
      {/* Transition sound effect - plays during the entire sequence */}
      <AudioEffect 
        src="/assets/sounds/transition_sound_12sec.mp3"
        play={playTransitionSound}
        loop={true}
        volume={0.7}
      />
    </>
  );
};