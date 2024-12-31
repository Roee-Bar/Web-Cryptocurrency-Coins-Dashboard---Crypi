// pages/index.js
import Link from 'next/link';
import StudentCard from '../components/StudentCard';
import { useTheme } from '../context/ThemeContext';


export default function About() {
  const { isDarkMode } = useTheme();
  const students = [
    {
      name: 'Ben Zacai',
      linkedin: 'https://www.linkedin.com/in/ben-zakai/',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQENExVjJyT-5g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1675891722883?e=1740009600&v=beta&t=wRqpBvOTfjDpHX_2946adpIroxPGUGfUUE-OjZn_V_o',
      workplace: 'Cyber security software developer | B.Sc Software Engineering Student',
    },
    {
      name: 'Nadir Yaakov',
      linkedin: 'https://www.linkedin.com/in/nadir-yaakov-479754154/',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQGgPw_u9go_oA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1656495965015?e=1740009600&v=beta&t=pmRLG3zbYuGABnOABdLO3Fyy1Cnsh4-UKjHqWUsd3lk',
      workplace: 'Student | Third year B.Sc Software Engineering Student',
    },
    {
      name: 'Roee Bar',
      linkedin: 'https://www.linkedin.com/in/roee-bar/',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQHeqUBj-3T3aA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1681210351276?e=1740009600&v=beta&t=jXsQLg7Rw9z8xO9QDynWK3C-tvLnfLQR-RTAOTCwhbI',
      workplace: 'Software Engineer | Technion Venture Capital Club',
    },
    {
      name: 'Eldar Gafarov',
      linkedin: 'https://www.linkedin.com/in/eldar-gafarov/',
      image: 'https://media.licdn.com/dms/image/v2/C4E03AQETFta5uSQoBA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1657556884411?e=1740009600&v=beta&t=IK8udnOH3pP1Y5_QiZU4QaI6maZilwJKEuIiLPFoAZI',
      workplace: 'SQA Engineer | B.Sc Software Engineering Student',
    },
  ];
  
  return (
    <div className={`min-h-screen flex flex-col justify-center items-center px-4 py-8
      ${isDarkMode 
        ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black'
        : 'bg-white'}`}>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 w-full max-w-7xl">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-wide mb-4 
          text-cyan-400">
          About Us
        </h1>
        <p className={`text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto
          ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          We are a team of 4 students from Braude College of Engineering: Ben Zacai, Nadir Yaakov, Roee Bar, and Eldar Gafarov.
        </p>
  
        <p className={`text-lg md:text-xl font-light mb-8 max-w-3xl mx-auto
          ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          This application was built as part of our Web Technologies course project. It provides live cryptocurrency prices, historical graphs, and detailed information about various coins.
        </p>  
        
        <p className={`text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto
          ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Meet the team behind the project:
        </p>

        {/* Students Grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {students.map((student, index) => (
            <StudentCard
              key={index}
              name={student.name}
              linkedin={student.linkedin}
              image={student.image}
              workplace={student.workplace}
            />
          ))}
        </div>

        {/* Go to Dashboard button */}
        <div className="flex justify-center mt-8">
          <Link href="/dashboard" legacyBehavior>
            <a className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-6 rounded-lg shadow-lg text-lg transition">
              Go to Dashboard
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
