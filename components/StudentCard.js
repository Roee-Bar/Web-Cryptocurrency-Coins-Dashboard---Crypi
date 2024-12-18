import React from 'react';

export default function StudentCard({ name, linkedin, image, workplace }) {
  return (
    <div className="bg-white text-black rounded-lg shadow-md p-4 w-64">
      <img
        src={image}
        alt={`${name}'s profile`}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-semibold text-center">{name}</h2>
      <p className="text-center text-gray-600">{workplace}</p>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-center text-cyan-500 hover:underline"
      >
        LinkedIn Profile
      </a>
    </div>
  );
}
