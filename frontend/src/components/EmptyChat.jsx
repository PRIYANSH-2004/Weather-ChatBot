import { useContext } from 'react';
import { ThemeContext } from '../App';

export default function EmptyChat() {
  const { theme, darkMode, city } = useContext(ThemeContext); // Added darkMode here
  // city="city"

  return (
    <div className={`flex-1 flex items-center justify-center p-8 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <div className="text-6xl mb-4">🌈</div>
          <h2 className={`text-2xl font-bold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}>
            AtmosAI
          </h2>
          <p className={`${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Want the perfect <span className="font-bold underline text-purple-400">{theme}</span> ideas for today’s weather? I’ve got you covered!
          </p>
        </div>

      </div>
    </div>
  );
}