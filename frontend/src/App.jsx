import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Navbar, Footer } from './components';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  BlogListPage,
  BlogDetailPage,
  CreateBlogPage,
  EditBlogPage,
  DashboardPage,
  NotFoundPage,
} from './pages';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen flex flex-col bg-black">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/blogs" element={<BlogListPage />} />
              <Route path="/blogs/create" element={<CreateBlogPage />} />
              <Route path="/blogs/:id" element={<BlogDetailPage />} />
              <Route path="/blogs/:id/edit" element={<EditBlogPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#282A3A',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#735F32',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
