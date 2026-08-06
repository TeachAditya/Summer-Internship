import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [mode, setMode] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('#d9534f');
  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await response.json();
      setMessage(data.message || 'Login failed');
      setMessageColor(response.ok ? '#0d7a70' : '#d9534f');
      if (response.ok && data.user) {
        login(data.user);
        navigate('/');
      }
    } catch (error) {
      setMessage('Unable to reach the server');
      setMessageColor('#d9534f');
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: signupName, email: signupEmail, password: signupPassword })
      });
      const data = await response.json();
      setMessage(data.message || 'Signup failed');
      setMessageColor(response.ok ? '#0d7a70' : '#d9534f');
      if (response.ok && data.user) {
        login(data.user);
        navigate('/');
      }
    } catch (error) {
      setMessage('Unable to reach the server');
      setMessageColor('#d9534f');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-visual-panel">
          <Link to="/" className="brand-header">
            <i className="fa-solid fa-bowl-food"></i> <span>FlavorShare</span>
          </Link>
          <div className="visual-welcome">
            <h2>Discover,<br />Cook & Share.</h2>
            <p>Join thousands of home chefs expanding their culinary boundaries daily. Lock in recipes, create personalized meal calendars, and track dynamic kitchen stats.</p>
          </div>
          <div style={{ fontSize: 12, opacity: 0.6 }}>&copy; 2026 FlavorShare Platform. All rights reserved.</div>
        </div>
        <div className="auth-form-panel">
          <div id="login-module" className={mode === 'login' ? '' : 'hidden'}>
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Don't have a profile yet? <span id="to-signup" onClick={() => setMode('signup')}>Sign Up</span></p>
            </div>
            <form id="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="login-email">Email Address</label>
                <div className="input-wrapper">
                  <input id="login-email" type="email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} placeholder="chef@flavorshare.com" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <div className="input-wrapper">
                  <input id="login-password" type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} placeholder="••••••••" required />
                </div>
              </div>
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> Remember me
                </label>
                <button type="button" className="forgot-pass">Forgot Password?</button>
              </div>
              <button type="submit" className="submit-btn">Login to Kitchen</button>
              <p id="login-message" className="form-message" style={{ color: messageColor }}>{message}</p>
            </form>
          </div>
          <div id="signup-module" className={mode === 'signup' ? '' : 'hidden'}>
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Already a community member? <span id="to-login" onClick={() => setMode('login')}>Log In</span></p>
            </div>
            <form id="signup-form" onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="signup-name">Full Name</label>
                <div className="input-wrapper">
                  <input id="signup-name" type="text" value={signupName} onChange={(event) => setSignupName(event.target.value)} placeholder="Chef G. Ramsey" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">Email Address</label>
                <div className="input-wrapper">
                  <input id="signup-email" type="email" value={signupEmail} onChange={(event) => setSignupEmail(event.target.value)} placeholder="chef@flavorshare.com" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="signup-password">Create Password</label>
                <div className="input-wrapper">
                  <input id="signup-password" type="password" value={signupPassword} onChange={(event) => setSignupPassword(event.target.value)} placeholder="Minimum 8 characters" required />
                </div>
              </div>
              <div className="form-options" style={{ marginBottom: 25 }}>
                <label className="remember-me" style={{ alignItems: 'flex-start' }}>
                  <input type="checkbox" style={{ marginTop: 4 }} required />
                  <span>I agree to the Terms of Service & Privacy Policy</span>
                </label>
              </div>
              <button type="submit" className="submit-btn" style={{ backgroundColor: '#0d7a70' }}>Begin Journey</button>
              <p id="signup-message" className="form-message" style={{ color: messageColor }}>{message}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
