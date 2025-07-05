import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide navbar on scroll
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); // scroll down → hide navbar
    } else {
      setShowNavbar(true); // scroll up → show navbar
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/login');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 pb-6 border-b border-white/10 backdrop-blur-md transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-white tracking-wider">
           NewzzBro
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <AnimatedLink to="/headlines">Headlines</AnimatedLink>
          <AnimatedLink to="/notes">Notes</AnimatedLink>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-all duration-300 shadow"
          >
            Logout
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-white bg-black/50 rounded-lg p-4">
          <Link to="/headlines" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            Headlines
          </Link>
          <Link to="/notes" onClick={() => setIsOpen(false)} className="hover:text-blue-400">
            Notes
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-all duration-300 shadow"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

// 🔥 Reusable animated underline link
const AnimatedLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative group text-white hover:text-blue-400 transition-all"
  >
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full"></span>
  </Link>
);

export default Navbar;
