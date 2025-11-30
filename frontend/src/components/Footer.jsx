import { Link } from 'react-router-dom';
import { FiGithub, FiHeart } from 'react-icons/fi';

/**
 * Footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-[#282A3A] border-t border-[rgba(255,255,255,0.1)]">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-xl font-semibold text-white hover:text-[#C69749] transition-colors"
            >
              <span className="text-[#C69749]">Blog</span>Site
            </Link>
            <p className="mt-3 text-sm text-[rgba(255,255,255,0.6)]">
              Share your stories with the world. A platform for writers and readers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-[rgba(255,255,255,0.6)] hover:text-[#C69749] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-sm text-[rgba(255,255,255,0.6)] hover:text-[#C69749] transition-colors"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-sm text-[rgba(255,255,255,0.6)] hover:text-[#C69749] transition-colors"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect
            </h4>
            <a
              href="https://github.com/Dipesh-J/Project-Blogging-Site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-[rgba(255,255,255,0.6)] hover:text-[#C69749] transition-colors"
            >
              <FiGithub className="mr-2" />
              GitHub Repository
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.1)]">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-[rgba(255,255,255,0.6)]">
            <p>&copy; {currentYear} BlogSite. All rights reserved.</p>
            <p className="mt-2 md:mt-0 flex items-center">
              Made with <FiHeart className="mx-1 text-[#ff4444]" /> by Dipesh Joshi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
