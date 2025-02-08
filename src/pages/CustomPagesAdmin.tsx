import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { LogOut, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useAdminStore } from '../store';

export default function CustomPagesAdmin() {
  const {
    customPages,
    addCustomPage,
    updateCustomPage,
    deleteCustomPage,
    isAuthenticated,
    logout,
  } = useAdminStore();
  const [editingPage, setEditingPage] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editHtml, setEditHtml] = useState('');
  const [showAddPage, setShowAddPage] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageHtml, setNewPageHtml] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleEdit = (id: number, title: string, html: string) => {
    setEditingPage(id);
    setEditTitle(title);
    setEditHtml(html);
  };

  const handleSave = (id: number) => {
    updateCustomPage(id, editTitle, editHtml);
    setEditingPage(null);
  };

  const handleAddPage = () => {
    if (newPageTitle && newPageHtml) {
      addCustomPage(newPageTitle, newPageHtml);
      setNewPageTitle('');
      setNewPageHtml('');
      setShowAddPage(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/admin"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Custom HTML Pages</h1>
          </div>
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage HTML Pages</h2>
            <button
              onClick={() => setShowAddPage(true)}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Page
            </button>
          </div>

          {showAddPage && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-3">Add New HTML Page</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="Page Title"
                />
                <textarea
                  value={newPageHtml}
                  onChange={(e) => setNewPageHtml(e.target.value)}
                  className="w-full h-64 p-2 border rounded font-mono"
                  placeholder="HTML Content"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddPage}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddPage(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {customPages.map((page) => (
              <div key={page.id} className="border p-4 rounded-lg">
                {editingPage === page.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-2 border rounded"
                      placeholder="Page Title"
                    />
                    <textarea
                      value={editHtml}
                      onChange={(e) => setEditHtml(e.target.value)}
                      className="w-full h-64 p-2 border rounded font-mono"
                      placeholder="HTML Content"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(page.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingPage(null)}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{page.title}</h3>
                      <p className="text-sm text-blue-600">
                        <Link to={`/page/${page.slug}`} target="_blank">
                          View Page
                        </Link>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleEdit(page.id, page.title, page.htmlContent)
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCustomPage(page.id)}
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