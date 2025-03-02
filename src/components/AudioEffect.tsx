import { useEffect, useRef } from 'react';

interface AudioEffectProps {
  src: string;
  play: boolean;
  loop?: boolean;
  volume?: number;
  onEnded?: () => void;
}

/**
 * AudioEffect Component
 * 
 * A utility component that plays audio effects
 * 
 * @param src - Path to the audio file
 * @param play - Whether the audio should play
 * @param loop - Whether the audio should loop
 * @param volume - Audio volume (0-1)
 * @param onEnded - Callback for when audio ends
 */
export const AudioEffect: React.FC<AudioEffectProps> = ({ 
  src, 
  play, 
  loop = false, 
  volume = 1,
  onEnded
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = volume;
      audioRef.current.loop = loop;
      
      if (onEnded) {
        audioRef.current.addEventListener('ended', onEnded);
      }
    }

    // Play or pause based on the play prop
    if (play) {
      // Reset if it's already played
      if (audioRef.current.currentTime > 0) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current.play().catch(err => console.error("Audio play error:", err));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        if (onEnded) {
          audioRef.current.removeEventListener('ended', onEnded);
        }
      }
    };
  }, [src, play, loop, volume, onEnded]);

  return null; // This component doesn't render anything
};