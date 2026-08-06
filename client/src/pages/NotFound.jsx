import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="content-container" style={{ padding: '60px 6%', textAlign: 'center' }}>
    <h1>Page not found</h1>
    <p style={{ margin: '16px 0', color: '#555555' }}>The page you were looking for doesn't exist or has been moved.</p>
    <Link to="/" className="cta-btn">Return home</Link>
  </div>
);

export default NotFound;
