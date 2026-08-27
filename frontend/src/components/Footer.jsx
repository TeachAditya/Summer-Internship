import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="logo" style={{ color: '#ffffff', marginBottom: '16px' }}>
            <i className="fa-solid fa-bowl-food" style={{ color: 'var(--accent)' }}></i>
            <span>FlavorShare</span>
          </div>
          <p style={{ fontSize: '13px', lineHeight: '1.6' }}>
            Discover, create, and share delicious recipes with home cooks and food lovers from around the world.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore Pages</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/explore">Explore Recipes</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/services">Services</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Community</h4>
          <ul>
            <li><Link to="/community">Community Feed</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/authen">Join FlavorShare</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact & Social</h4>
          <ul>
            <li><a href="#support"><i className="fa-regular fa-envelope"></i> support@flavorshare.com</a></li>
            <li><a href="#instagram"><i className="fa-brands fa-instagram"></i> @flavorshare</a></li>
            <li><a href="#twitter"><i className="fa-brands fa-x-twitter"></i> @flavorshare</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} FlavorShare. Built with React & Node Express. All rights reserved.
      </div>
    </footer>
  );
}
