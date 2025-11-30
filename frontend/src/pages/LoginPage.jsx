import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Button, Input, Card } from '../components';
import { useLogin } from '../hooks';
import { useAuthStore } from '../store';

/**
 * Login page component
 */
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 animate-fadeIn">
      <div className="w-full max-w-md px-4">
        <Card variant="outlined" padding="lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-[rgba(255,255,255,0.6)]">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                required
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              <FiMail className="absolute right-4 top-10 text-[rgba(255,255,255,0.4)]" />
            </div>

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                required
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-[rgba(255,255,255,0.4)] hover:text-white transition-colors"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <Button
              type="submit"
              fullWidth
              loading={isPending}
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[rgba(255,255,255,0.6)]">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="text-[#C69749] hover:text-[#735F32] font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
