// Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '', role: 'client' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Ici, normalement on ferait une requête au backend
    const mockUser = {
      name: form.email.split('@')[0],
      role: form.role,
      id: Math.random().toString(36).substring(2)
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    navigate(form.role === 'employee' ? '/dashboard' : '/search');
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
      {!isLogin && (
        <>
          <input name="name" placeholder="Nom complet" value={form.name} onChange={handleChange} />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="client">Client</option>
            <option value="employee">Employé</option>
          </select>
        </>
      )}
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} />
      <button onClick={handleSubmit}>{isLogin ? 'Se connecter' : 'S\'inscrire'}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Créer un compte' : 'Déjà un compte? Se connecter'}
      </button>
    </div>
  );
}

export default Auth;