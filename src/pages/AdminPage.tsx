import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { LogOut, Plus, Trash2, Home, Save, ArrowUp, ArrowDown, ToggleLeft, ToggleRight, BellRing } from 'lucide-react';
import { useAdminStore } from '../store';

export default function AdminPage() {
  const {
    cards,
    announcement,
    updateCard,
    addCard,
    deleteCard,
    reorderCards,
    toggleCardStatus,
    updateAnnouncement,
    toggleAnnouncement,
    isAuthenticated,
    hasUnsavedChanges,
    saveChanges,
    logout,
  } = useAdminStore();
  const [editingCard, setEditingCard] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardUrl, setNewCardUrl] = useState('');
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [disableReason, setDisableReason] = useState('');
  const [showDisableModal, setShowDisableModal] = useState<number | null>(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementContent, setAnnouncementContent] = useState(announcement?.content || '');

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

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

  const handleMoveCard = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < cards.length) {
      reorderCards(index, newIndex);
    }
  };

  const handleSaveChanges = () => {
    saveChanges();
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleToggleStatus = (id: number, currentStatus: boolean) => {
    if (currentStatus) {
      setShowDisableModal(id);
      setDisableReason('');
    } else {
      toggleCardStatus(id, true);
    }
  };

  const handleDisableConfirm = () => {
    if (showDisableModal && disableReason.trim()) {
      toggleCardStatus(showDisableModal, false, disableReason.trim());
      setShowDisableModal(null);
      setDisableReason('');
    }
  };

  const handleSaveAnnouncement = () => {
    if (announcementContent.trim()) {
      updateAnnouncement(announcementContent.trim());
      setShowAnnouncementModal(false);
    }
  };

  const sortedCards = [...cards].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <Link
              to="/"
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowAnnouncementModal(true)}
              className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              <BellRing className="w-4 h-4 mr-2" />
              {announcement ? 'Edit Announcement' : 'Add Announcement'}
            </button>
            <button
              onClick={handleSaveChanges}
              className={`flex items-center px-4 py-2 ${
                hasUnsavedChanges
                  ? 'bg-yellow-500 hover:bg-yellow-600'
                  : 'bg-gray-400'
              } text-white rounded transition-colors`}
              disabled={!hasUnsavedChanges}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
            <button
              onClick={logout}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {showSaveNotification && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            Changes saved successfully!
          </div>
        )}

        {showAnnouncementModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">
                {announcement ? 'Edit Announcement' : 'Add Announcement'}
              </h3>
              <div className="space-y-4">
                <textarea
                  value={announcementContent}
                  onChange={(e) => setAnnouncementContent(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Enter announcement message..."
                  rows={4}
                />
                <div className="flex items-center space-x-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={announcement?.active ?? false}
                      onChange={(e) => toggleAnnouncement(e.target.checked)}
                      className="mr-2"
                    />
                    Show Announcement
                  </label>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAnnouncementModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAnnouncement}
                    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    disabled={!announcementContent.trim()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showDisableModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Disable Card</h3>
              <p className="text-gray-600 mb-4">
                Please provide a reason for disabling this card:
              </p>
              <textarea
                value={disableReason}
                onChange={(e) => setDisableReason(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                placeholder="Enter reason..."
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDisableModal(null)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDisableConfirm}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={!disableReason.trim()}
                >
                  Disable
                </button>
              </div>
            </div>
          </div>
        )}

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
            {sortedCards.map((card, index) => (
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
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => handleMoveCard(index, 'up')}
                            disabled={index === 0}
                            className={`p-1 rounded ${
                              index === 0 ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleMoveCard(index, 'down')}
                            disabled={index === cards.length - 1}
                            className={`p-1 rounded ${
                              index === cards.length - 1 ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </div>
                        <div>
                          <h3 className="font-semibold">{card.title}</h3>
                          <p className="text-sm text-gray-600">{card.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleStatus(card.id, card.enabled)}
                          className={`p-2 rounded ${
                            card.enabled
                              ? 'text-green-500 hover:bg-green-50'
                              : 'text-red-500 hover:bg-red-50'
                          }`}
                        >
                          {card.enabled ? (
                            <ToggleRight className="w-6 h-6" />
                          ) : (
                            <ToggleLeft className="w-6 h-6" />
                          )}
                        </button>
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
                    {!card.enabled && card.disableReason && (
                      <div className="mt-2 p-2 bg-red-50 text-red-600 rounded text-sm">
                        Disabled: {card.disableReason}
                      </div>
                    )}
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
