import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { Button, Input, Select, Card } from '../components';
import { useRegister } from '../hooks';
import { useAuthStore } from '../store';

/**
 * Registration page component
 */
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { mutate: registerUser, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: '',
      lname: '',
      title: '',
      email: '',
      password: '',
    },
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const titleOptions = [
    { value: 'Mr', label: 'Mr' },
    { value: 'Mrs', label: 'Mrs' },
    { value: 'Miss', label: 'Miss' },
  ];

  const onSubmit = (data) => {
    registerUser(data);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 animate-fadeIn">
      <div className="w-full max-w-md px-4">
        <Card variant="outlined" padding="lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">
              Create Account
            </h1>
            <p className="text-[rgba(255,255,255,0.6)]">
              Join our community of writers
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  label="First Name"
                  placeholder="First name"
                  required
                  error={errors.fname?.message}
                  {...register('fname', {
                    required: 'First name is required',
                    pattern: {
                      value: /^[A-Z][a-z]+$/,
                      message: 'Start with capital letter',
                    },
                  })}
                />
              </div>
              <div className="relative">
                <Input
                  label="Last Name"
                  placeholder="Last name"
                  required
                  error={errors.lname?.message}
                  {...register('lname', {
                    required: 'Last name is required',
                    pattern: {
                      value: /^[A-Z][a-z]+$/,
                      message: 'Start with capital letter',
                    },
                  })}
                />
              </div>
            </div>

            <Select
              label="Title"
              options={titleOptions}
              required
              error={errors.title?.message}
              {...register('title', {
                required: 'Title is required',
              })}
            />

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
                placeholder="Create a password"
                required
                error={errors.password?.message}
                helperText="8-16 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character"
                {...register('password', {
                  required: 'Password is required',
                  pattern: {
                    value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                    message: 'Password must meet requirements',
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
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[rgba(255,255,255,0.6)]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#C69749] hover:text-[#735F32] font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
