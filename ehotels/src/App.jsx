// App.jsx mis à jour
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './Auth';
import EnhancedRoomSearch from './EnhancedRoomSearch';
import EmployeeDashboard from './EmployeeDashboard';

function PrivateRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/auth" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Routes client */}
        <Route path="/search" element={
          <PrivateRoute roles={['client']}>
            <EnhancedRoomSearch />
          </PrivateRoute>
        } />
        <Route path="/profile" element={
          <PrivateRoute roles={['client']}>
            <ClientProfile />
          </PrivateRoute>
        } />
        
        {/* Routes employé */}
        <Route path="/dashboard" element={
          <PrivateRoute roles={['employee']}>
            <EmployeeDashboard />
          </PrivateRoute>
        } />
        
        {/* Routes communes */}
        <Route path="/booking/:id" element={
          <PrivateRoute>
            <BookingConfirmation />
          </PrivateRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
