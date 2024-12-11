import { useEffect, useState } from 'react';
import Link from 'next/link';

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
      {/* Back Button */}
      <Link
        href="/binance"
        className="back-btn bg-white text-black dark:bg-black dark:text-white px-4 py-2 rounded-md shadow hover:bg-gray-200 dark:hover:bg-gray-700 transition mr-4"
      >
        ← Dashboard
      </Link>
      <h1 className="header-title text-lg font-bold flex-1 text-center">
        Real-Time Crypto Prices
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
