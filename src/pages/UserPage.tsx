import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAdminStore } from '../store';

export default function UserPage() {
  const { cards } = useAdminStore();

  return (
    <div className="gradient-bg min-h-screen font-roboto text-white relative">
      {/* Login Button */}
      <div className="absolute top-4 right-4">
        <Link
          to="/login"
          className="flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
        >
          <LogIn className="w-4 h-4 mr-2" />
          <span>Admin</span>
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen">
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
    </div>
  );
}