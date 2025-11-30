import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuthStore } from '../store';
import toast from 'react-hot-toast';

/**
 * Hook for user login
 */
export const useLogin = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      if (data.data) {
        setToken(data.data);
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    },
    onError: (error) => {
      const message = error.response?.data?.message || error.response?.data?.msg || 'Login failed. Please check your credentials.';
      toast.error(message);
    },
  });
};

/**
 * Hook for user registration
 */
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authAPI.register,
    onSuccess: () => {
      toast.success('Registration successful! Please login.');
      navigate('/login');
    },
    onError: (error) => {
      const message = error.response?.data?.message || error.response?.data?.msg || 'Registration failed. Please try again.';
      toast.error(message);
    },
  });
};

/**
 * Hook for logout functionality
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return handleLogout;
};
