import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'login';
  const [activeTab, setActiveTab] = useState(initialTab);

  const { login, signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/explore');
    }
  }, [user, navigate]);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password || (activeTab === 'signup' && !name)) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      if (activeTab === 'login') {
        const res = await login({ email, password });
        setSuccessMsg(res.message || 'Welcome back!');
        setTimeout(() => navigate('/explore'), 1000);
      } else {
        const res = await signup({ name, email, password });
        setSuccessMsg(res.message || 'Account created successfully!');
        setTimeout(() => navigate('/explore'), 1000);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-tabs">
        <button
          className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('login');
            setErrorMsg('');
            setSuccessMsg('');
          }}
        >
          Login
        </button>
        <button
          className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('signup');
            setErrorMsg('');
            setSuccessMsg('');
          }}
        >
          Sign Up
        </button>
      </div>

      {errorMsg && <div className="alert-message alert-error">{errorMsg}</div>}
      {successMsg && <div className="alert-message alert-success">{successMsg}</div>}

      <form onSubmit={handleSubmit}>
        {activeTab === 'signup' && (
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              placeholder="Chef Gordon"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            placeholder="chef@flavorshare.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading
            ? 'Processing...'
            : activeTab === 'login'
            ? 'Login to FlavorShare'
            : 'Create Account'}
        </button>
      </form>
    </div>
  );
}
