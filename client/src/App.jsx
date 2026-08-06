import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Categories from './pages/Categories';
import Community from './pages/Community';
import About from './pages/About';
import Services from './pages/Services';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';

function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthNavigate = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="app-shell">
      <Navbar onAuthNavigate={handleAuthNavigate} isAuthenticated={Boolean(user)} userName={user?.name} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
