import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import { Button } from '../components';

/**
 * 404 Not Found page component
 */
const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 animate-fadeIn">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-[#735F32] mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-[rgba(255,255,255,0.6)] mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/">
            <Button>
              <FiHome className="mr-2" />
              Go Home
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()}>
            <FiArrowLeft className="mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
