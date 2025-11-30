import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiEdit } from 'react-icons/fi';
import { useAuthStore } from '../store';
import Button from './Button';

/**
 * Navbar component with responsive design
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/blogs', label: 'Blogs' },
  ];

  const authLinks = isAuthenticated
    ? [
        { path: '/blogs/create', label: 'Write', icon: FiEdit },
        { path: '/dashboard', label: 'Dashboard', icon: FiUser },
      ]
    : [];

  return (
    <nav className="sticky top-0 z-40 bg-[#282A3A] shadow-navbar">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-xl font-semibold text-white hover:text-[#C69749] transition-colors"
          >
            <span className="text-[#C69749]">Blog</span>Site
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  text-sm font-medium transition-colors
                  ${isActive(link.path)
                    ? 'text-[#C69749]'
                    : 'text-[rgba(255,255,255,0.8)] hover:text-[#C69749]'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {authLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`
                      flex items-center text-sm font-medium transition-colors
                      ${isActive(link.path)
                        ? 'text-[#C69749]'
                        : 'text-[rgba(255,255,255,0.8)] hover:text-[#C69749]'
                      }
                    `}
                  >
                    <link.icon className="mr-1.5" />
                    {link.label}
                  </Link>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <FiLogOut className="mr-1.5" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white hover:text-[#C69749] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[rgba(255,255,255,0.1)] animate-fadeIn">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    text-sm font-medium py-2 transition-colors
                    ${isActive(link.path)
                      ? 'text-[#C69749]'
                      : 'text-[rgba(255,255,255,0.8)] hover:text-[#C69749]'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  {authLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center text-sm font-medium py-2 transition-colors
                        ${isActive(link.path)
                          ? 'text-[#C69749]'
                          : 'text-[rgba(255,255,255,0.8)] hover:text-[#C69749]'
                        }
                      `}
                    >
                      <link.icon className="mr-2" />
                      {link.label}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-sm font-medium py-2 text-[rgba(255,255,255,0.8)] hover:text-[#ff4444] transition-colors"
                  >
                    <FiLogOut className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-4 border-t border-[rgba(255,255,255,0.1)]">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="ghost" fullWidth>
                      Login
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" fullWidth>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
