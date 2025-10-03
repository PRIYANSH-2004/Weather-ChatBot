import { useState, useRef, useEffect, useContext } from 'react';
import { Send, Mic } from 'lucide-react';
import { ThemeContext } from '../App';

export default function MessageInput({ onSend, disabled, isLoading }) {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const { lang, city, setCity, darkMode } = useContext(ThemeContext);
  const textareaRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [text]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!text.trim() || disabled || isLoading) return;
    
    // Send message to parent component
    onSend(text.trim());
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Voice recognition functionality
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang;

    recognition.onstart = () => {
      setListening(true);
      console.log('Speech recognition started. Language:', lang);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Transcript:', transcript);
      setText(prev => prev ? `${prev} ${transcript}` : transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
      if (event.error !== 'no-speech') {
        alert(`Speech recognition error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setListening(false);
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className={`border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">


        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={disabled || isLoading}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            rows={1}
            style={{ minHeight: '40px', maxHeight: '120px' }}
          />
        </div>

        {/* Voice Input Button */}
        <button
          type="button"
          onClick={toggleListening}
          disabled={disabled || isLoading}
          className={`
            relative flex items-center justify-center p-3 rounded-full transition-all duration-300
            ${listening 
              ? 'bg-red-500 shadow-lg shadow-red-300/50 hover:bg-red-600' 
              : darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 shadow-md' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600 shadow-sm'}
            ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          title={listening ? 'Stop listening' : 'Start voice input'}
        >
          <Mic className={`
            h-6 w-6 transition-transform duration-300
            ${listening ? 'animate-pulse text-white scale-110' : ''}
          `} />
          {listening && (
            <span className="absolute top-0 left-0 w-full h-full rounded-full bg-red-400 opacity-20 animate-ping"></span>
          )}
        </button>


        {/* Send Button */}

        <button className="bg-purple-500 hover:bg-purple-600 p-3 rounded-full">
          <Send className="h-6 w-6 text-white" />
        </button>



      </form>
    </div>
  );
}
