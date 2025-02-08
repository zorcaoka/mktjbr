import React from 'react';
import { useAdminStore } from '../store';

export default function UserPage() {
  const { cards } = useAdminStore();

  return (
    <div className="gradient-bg flex flex-col items-center justify-center min-h-screen font-roboto text-white">
      <h1 className="text-4xl font-bold mb-8 sm:text-3xl text-center">
        MARKETING HELP CENTER
      </h1>

      <div className="flex flex-col space-y-4 w-full max-w-md px-4 mobile-fullscreen">
        {cards.map((card) => (
          <a
            key={card.id}
            href={card.url}
            className="card bg-white p-6 rounded-lg shadow-lg flex items-center justify-center text-lg font-bold text-gray-800 transition-transform duration-300 hover:bg-gray-100 sm:p-4 sm:text-base mobile-card"
          >
            <span className="block text-center">{card.title}</span>
          </a>
        ))}
        <p className="label-text">
          Jika File masih belum update bisa cek berkala
        </p>
      </div>
    </div>
  );
}