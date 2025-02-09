import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, AlertTriangle, X } from 'lucide-react';
import { useAdminStore } from '../store';

export default function UserPage() {
  const { cards, announcement } = useAdminStore();
  const sortedCards = [...cards].sort((a, b) => a.order - b.order);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  useEffect(() => {
    const hasSeenAnnouncement = localStorage.getItem(`announcement-${announcement?.id}`);
    if (announcement?.active && !hasSeenAnnouncement) {
      setShowAnnouncement(true);
    }
  }, [announcement]);

  const handleCloseAnnouncement = () => {
    setShowAnnouncement(false);
    if (announcement?.id) {
      localStorage.setItem(`announcement-${announcement.id}`, 'true');
    }
  };

  return (
    <div className="gradient-bg flex flex-col items-center justify-center min-h-screen font-roboto text-white">
      {showAnnouncement && announcement?.active && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
            <button
              onClick={handleCloseAnnouncement}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Announcement</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{announcement.content}</p>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4">
        <Link
          to="/login"
          className="flex items-center px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <Settings className="w-4 h-4 mr-2" />
          <span>Admin</span>
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 sm:text-3xl text-center">
        MARKETING HELP CENTER
      </h1>

      <div className="flex flex-col space-y-4 w-full max-w-md px-4 mobile-fullscreen">
        {sortedCards.map((card) => (
          <div key={card.id} className="relative">
            {card.enabled ? (
              <a
                href={card.url}
                className="card bg-white p-6 rounded-lg shadow-lg flex items-center justify-center text-lg font-bold text-gray-800 transition-transform duration-300 hover:bg-gray-100 sm:p-4 sm:text-base mobile-card"
              >
                <span className="block text-center">{card.title}</span>
              </a>
            ) : (
              <div className="card bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-lg font-bold text-gray-400 sm:p-4 sm:text-base mobile-card space-y-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="block text-center">{card.title}</span>
                </div>
                {card.disableReason && (
                  <p className="text-sm font-normal text-gray-500">
                    {card.disableReason}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
        <p className="label-text">
          Jika File masih belum update bisa cek berkala
        </p>
      </div>
    </div>
  );
}
