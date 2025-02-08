import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import CustomPagesAdmin from './pages/CustomPagesAdmin';
import CustomPage from './pages/CustomPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/pages" element={<CustomPagesAdmin />} />
        <Route path="/page/:slug" element={<CustomPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;