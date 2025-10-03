import { useEffect, useContext } from 'react';
import { ThemeContext } from '../App';

export default function VoiceInputButton({ 
  lang, 
  listening, 
  setListening, 
  onResult, 
  disabled = false 
}) {
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    return () => {
      if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang || 'en-US';

    let silenceTimeout;

    recognition.onstart = () => {
      setListening(true);
      console.log('Voice recognition started. Language:', lang);
      // Start silence timer
      silenceTimeout = setTimeout(() => {
        recognition.stop();
      }, 2000);
    };

    recognition.onresult = (event) => {
      clearTimeout(silenceTimeout);
      const transcript = event.results[0][0].transcript;
      console.log('Voice transcript:', transcript);
      if (onResult) {
        onResult(transcript);
      }
    };

    recognition.onspeechend = () => {
      // If speech ends, start silence timer
      silenceTimeout = setTimeout(() => {
        recognition.stop();
      }, 2000);
    };

    recognition.onerror = (event) => {
      clearTimeout(silenceTimeout);
      console.error('Speech recognition error', event.error);
      setListening(false);
      alert(`Voice recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      clearTimeout(silenceTimeout);
      setListening(false);
    };

    try {
      recognition.start();
    } catch (err) {
      clearTimeout(silenceTimeout);
      console.error('Error starting speech recognition:', err);
      setListening(false);
    }
  };

  const stopListening = () => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.stop();
    }
    setListening(false);
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      disabled={disabled}
      className={`p-2 rounded-full transition-colors ${
        disabled 
          ? 'cursor-not-allowed text-gray-400' 
          : listening 
            ? 'bg-red-500 text-white animate-pulse' 
            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-200 dark:hover:bg-gray-600'
      }`}
      aria-label={listening ? 'Stop voice input' : 'Start voice input'}
    >
      {listening ? '🎤' : '🎙️'}
    </button>
  );
}