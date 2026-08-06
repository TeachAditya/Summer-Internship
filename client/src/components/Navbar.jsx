import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/explore', label: 'Explore Recipes' },
  { path: '/categories', label: 'Categories' },
  { path: '/community', label: 'Community' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' }
];

const Navbar = ({ onAuthNavigate, isAuthenticated, userName }) => {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="logo">
        <i className="fa-solid fa-bowl-food"></i> <span>FlavorShare</span>
      </div>
      <nav className="nav-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="nav-right">
        {isAuthenticated ? (
          <>
            <span className="user-greeting">Hello, {userName}</span>
            <button className="signup-btn logout-link" onClick={onAuthNavigate}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/auth" className="login-btn">Login</Link>
            <Link to="/auth" className="signup-btn">Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
