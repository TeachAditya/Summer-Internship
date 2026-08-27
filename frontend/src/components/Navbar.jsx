import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <i className="fa-solid fa-bowl-food"></i>
        <span>FlavorShare</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Home
        </NavLink>
        <NavLink to="/explore" className={({ isActive }) => (isActive ? 'active' : '')}>
          Explore Recipes
        </NavLink>
        <NavLink to="/categories" className={({ isActive }) => (isActive ? 'active' : '')}>
          Categories
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
          Services
        </NavLink>
        <NavLink to="/community" className={({ isActive }) => (isActive ? 'active' : '')}>
          Community
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
          About
        </NavLink>
      </nav>

      <div className="nav-right">
        {user ? (
          <div className="user-badge">
            <span className="user-greeting">
              <i className="fa-solid fa-user-circle" style={{ marginRight: '6px' }}></i>
              {user.name}
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/authen?tab=login" className="login-btn">
              Login
            </Link>
            <Link to="/authen?tab=signup" className="signup-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
