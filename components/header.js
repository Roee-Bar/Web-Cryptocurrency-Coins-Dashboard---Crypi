import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoHomeSharp, IoMoonSharp, IoSunnySharp } from "react-icons/io5";
import { useTheme } from '../context/ThemeContext';
import { useRouter } from 'next/router';

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const router = useRouter();

  return (
    <header className={`header p-4 flex justify-between items-center shadow-md
      ${isDarkMode 
        ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black' 
        : 'bg-white'}`}>
      {router.pathname !== '/' && (
        <Link href="/">
          <IoHomeSharp size={32} className={isDarkMode ? 'text-white' : 'text-black'} />
        </Link>
      )}
      <div className="flex-1 flex justify-end">
        <button
          onClick={toggleDarkMode}
          className={`relative flex items-center w-24 h-12 rounded-full p-1 transition-colors duration-300 ease-in-out
            ${isDarkMode 
              ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black' 
              : 'bg-gradient-to-r from-blue-200 via-blue-800 to-white-300'
            }`}
        >
          <div
            className={`relative z-10 w-10 h-10 rounded-full transform transition-transform duration-300 ease-in-out flex items-center justify-center
              ${isDarkMode 
                ? 'translate-x-12 bg-gray-700' 
                : 'translate-x-0 bg-white'
              }`}
          >
            {isDarkMode ? (
              <IoMoonSharp className="w-6 h-6 text-white" />
            ) : (
              <IoSunnySharp className="w-6 h-6 text-yellow-500" />
            )}
          </div>
        </button>
      </div>
    </header>
  );
}