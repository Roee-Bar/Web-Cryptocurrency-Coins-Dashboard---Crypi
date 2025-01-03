// pages/index.js
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

export default function Home() 
{
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col justify-center items-center 
      ${isDarkMode 
        ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black'
        : 'bg-gradient-to-r from-purple-800 via-blue-800 to-black'} 
      text-white relative`}>
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-opacity-60 bg-gradient-to-br from-black via-transparent to-black pointer-events-none"></div>
      {/* Dark mode Button, to check how i works. */}
      <button
        onClick={toggleDarkMode}
        className="absolute top-4 right-4 bg-white text-black dark:bg-gray-800 dark:text-white 
          px-4 py-2 rounded-md shadow hover:shadow-lg transition z-20"
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Crypto-themed heading */}
        <h1 className="text-cyan-400 text-5xl md:text-6xl font-extrabold tracking-wide mb-4 drop-shadow-lg">
          Welcome to Crypi
        </h1>
        <p className="text-lg md:text-xl font-light text-gray-300 mb-8 max-w-2xl mx-auto">
          Explore live cryptocurrency prices, market trends, and more. Empowering your crypto journey.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/dashboard" legacyBehavior>
            <a className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-6 rounded-lg shadow-lg text-lg transition">
              Go to Dashboard
            </a>
          </Link>
          <Link href="/about" legacyBehavior>
            <a className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg shadow-lg text-lg transition">
              About Us
            </a>
          </Link>
        </div>
      </div>

      {/* Decorative crypto-themed icons */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-400 to-blue-600 rounded-full opacity-30 blur-3xl"></div>
      </div>
    </div>
  );
}
