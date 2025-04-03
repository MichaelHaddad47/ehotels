// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    if (form.email === 'Postgres' && form.password === 'Postgres') {
      const mockUser = { name: 'Postgres', role: 'tester' };
      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/rooms');
    } else {
      alert('Invalid credentials. Try Postgres / Postgres');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h2>Employee Login</h2>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} style={{ margin: '10px' }} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={{ margin: '10px' }} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
