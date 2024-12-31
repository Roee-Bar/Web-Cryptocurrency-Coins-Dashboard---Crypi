import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoHomeSharp } from "react-icons/io5";


export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for user preference on initial load
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'dark') {
      document.documentElement.classList.add('dark'); // Apply dark mode to the root element
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);

    if (!isDarkMode) {
      document.documentElement.classList.add('dark'); // Enable dark mode
      localStorage.setItem('theme', 'dark'); // Save preference to localStorage
    } else {
      document.documentElement.classList.remove('dark'); // Disable dark mode
      localStorage.setItem('theme', 'light'); // Save preference to localStorage
    }
  };

  return (
    <header className="header bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md p-4 flex justify-between items-center">
      {/* Home Button */}
      <Link href="/">
          <IoHomeSharp size={`${Math.min(window.innerWidth * 0.08, 32)}px`}/>
      </Link>
      <h1 className="header-title text-lg font-bold flex-1 text-center">
      <Link href="/dashboard">Real-Time Crypto Prices</Link>
      </h1>
      <button
        onClick={toggleDarkMode}
        className="dark-mode-toggle bg-white text-black dark:bg-black dark:text-white px-4 py-2 rounded-md shadow hover:shadow-lg transition"
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}