// pages/index.js
import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-purple-800 via-blue-800 to-black text-white">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-opacity-60 bg-gradient-to-br from-black via-transparent to-black pointer-events-none"></div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Crypto-themed heading */}
        <h1 className="text-cyan-400 text-5xl md:text-6xl font-extrabold tracking-wide mb-4 drop-shadow-lg">
          About Us
        </h1>
        <p className="text-lg md:text-xl font-light text-gray-300 mb-8 max-w-2xl mx-auto">
            We are a team of 4 students from Braude College of Engineering: Ben Zacai, Nadir Yaakov, Roee Bar, and Eldar Gafarov.
          </p>
  
          <p className="text-lg md:text-xl font-light text-gray-300 mb-8 max-w-3xl mx-auto">
            This application was built as part of our Web Technologies course project. It provides live cryptocurrency prices, historical graphs, and detailed information about various coins.
          </p>  

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/dashboard" legacyBehavior>
            <a className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-6 rounded-lg shadow-lg text-lg transition">
              Go to Dashboard
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg shadow-lg text-lg transition">
              Welcome Page
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
