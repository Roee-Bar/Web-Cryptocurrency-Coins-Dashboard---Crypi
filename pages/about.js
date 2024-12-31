// pages/index.js
import Link from 'next/link';
import StudentCard from '../components/StudentCard';


export default function About() {
  const students = [
    {
      name: 'Ben Zacai',
      linkedin: 'https://www.linkedin.com/in/ben-zakai/',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQENExVjJyT-5g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1675891722883?e=1740009600&v=beta&t=wRqpBvOTfjDpHX_2946adpIroxPGUGfUUE-OjZn_V_o',
      workplace: 'Cyber security software developer | B.sc Software engineering student',
    },
    {
      name: 'Nadir Yaakov',
      linkedin: 'https://www.linkedin.com/in/nadir-yaakov-479754154/',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQGgPw_u9go_oA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1656495965015?e=1740009600&v=beta&t=pmRLG3zbYuGABnOABdLO3Fyy1Cnsh4-UKjHqWUsd3lk',
      workplace: 'Student | Third year B.Sc software engineering',
    },
    {
      name: 'Roee Bar',
      linkedin: 'https://www.linkedin.com/in/roee-bar/',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQHeqUBj-3T3aA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1681210351276?e=1740009600&v=beta&t=jXsQLg7Rw9z8xO9QDynWK3C-tvLnfLQR-RTAOTCwhbI',
      workplace: 'Software Engineer | Elbit Systems | Technion Venture Capital Club | Google Developers Group Haifa',
    },
    {
      name: 'Eldar Gafarov',
      linkedin: 'https://www.linkedin.com/in/eldar-gafarov/',
      image: 'https://media.licdn.com/dms/image/v2/C4E03AQETFta5uSQoBA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1657556884411?e=1740009600&v=beta&t=IK8udnOH3pP1Y5_QiZU4QaI6maZilwJKEuIiLPFoAZI',
      workplace: 'SQA Engineer | B.Sc. Software Engineer Student | Python | C | Java | Debate | Data | Machine Learning',
    },
  ];
  
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
          <p className="text-lg md:text-xl font-light text-gray-300 mb-8 max-w-2xl mx-auto">
          Meet the team behind the project:
        </p>
        <div className="flex flex-wrap justify-center gap-6">
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
        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
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
