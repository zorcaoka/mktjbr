import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { LogOut, Plus, Trash2, Code } from 'lucide-react';
import { useAdminStore } from '../store';

export default function AdminPage() {
  const {
    cards,
    updateCard,
    addCard,
    deleteCard,
    isAuthenticated,
    logout,
  } = useAdminStore();
  const [editingCard, setEditingCard] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardUrl, setNewCardUrl] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleEdit = (id: number, title: string, url: string) => {
    setEditingCard(id);
    setEditTitle(title);
    setEditUrl(url);
  };

  const handleSave = (id: number) => {
    updateCard(id, editTitle, editUrl);
    setEditingCard(null);
  };

  const handleAddCard = () => {
    if (newCardTitle && newCardUrl) {
      addCard(newCardTitle, newCardUrl);
      setNewCardTitle('');
      setNewCardUrl('');
      setShowAddCard(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex space-x-4">
            <Link
              to="/admin/pages"
              className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              <Code className="w-4 h-4 mr-2" />
              Manage HTML Pages
            </Link>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage Cards</h2>
            <button
              onClick={() => setShowAddCard(true)}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </button>
          </div>

          {showAddCard && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-3">Add New Card</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Card Title"
                />
                <input
                  type="url"
                  value={newCardUrl}
                  onChange={(e) => setNewCardUrl(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Card URL"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddCard}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddCard(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {cards.map((card) => (
              <div key={card.id} className="border p-4 rounded-lg">
                {editingCard === card.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Card Title"
                    />
                    <input
                      type="url"
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Card URL"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(card.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCard(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{card.title}</h3>
                      <p className="text-sm text-gray-600">{card.url}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(card.id, card.title, card.url)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCard(card.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}