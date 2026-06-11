import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { HiOutlineUser } from 'react-icons/hi';
import { useAppDispatch } from '@/hooks/useAppSelector';
import { setCredentials } from '@/features/auth/slices/authSlice';
import { loginSchema, type LoginFields } from '@/features/auth/schemas/loginSchema';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Tabs } from '@/components/ui/Tabs';

const AUTH_TABS = [
  { id: 'login', label: 'Log in' },
  { id: 'signup', label: 'Sign up' },
];

const DISCLAIMER_TEXT =
  'Disclaimer: Please note that Gambling involves a financial risk and could be addictive over time if not practised within limits. Only 18+ people should use the services and should use it responsibly. Players should be aware of any financial risk and govern themselves accordingly.';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '', rememberMe: false },
  });

  const submitLoginForm = async (formData: LoginFields) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const loggedInUser = {
        id: 'u-001',
        firstName: 'Player',
        lastName: 'One',
        username: formData.identifier.includes('@')
          ? formData.identifier.split('@')[0]
          : formData.identifier,
        email: formData.identifier.includes('@')
          ? formData.identifier
          : `${formData.identifier}@rani555.com`,
        phone: '9876543210',
        balance: 0,
        currency: 'INR',
        isVerified: false,
        kycStatus: 'pending' as const,
        referralCode: 'RANI555',
        createdAt: new Date().toISOString(),
      };

      dispatch(
        setCredentials({
          user: loggedInUser,
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        })
      );

      toast.success(`Welcome back, ${loggedInUser.username}!`);
      navigate(ROUTES.DASHBOARD);
    } catch {
      toast.error('Invalid username/email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Tab switcher */}
      <Tabs
        tabs={AUTH_TABS}
        activeTab="login"
        onChange={(tabId) => tabId === 'signup' && navigate(ROUTES.SIGNUP)}
      />

      {/* Heading */}
      <p className="text-sm font-semibold text-white mt-1">
        Please enter your login details here
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(submitLoginForm)} className="flex flex-col gap-4">
        <Input
          {...register('identifier')}
          label="Username or Email"
          placeholder="Enter Username or Email"
          error={errors.identifier?.message}
          icon={<HiOutlineUser className="h-4.5 w-4.5" />}
        />

        <div className="flex flex-col gap-1">
          <PasswordInput
            {...register('password')}
            label="Password"
            placeholder="Password"
            error={errors.password?.message}
          />
          <div className="flex justify-end">
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-xs text-yellow-500 hover:text-yellow-400 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <Button
          variant="gold"
          size="lg"
          type="submit"
          isLoading={isSubmitting}
          className="w-full rounded-lg font-bold text-sm"
        >
          Log In
        </Button>
      </form>

      {/* Sign up redirect */}
      <div className="flex items-center gap-1 justify-center mt-1">
        <span className="text-xs text-yellow-500/80 font-medium">Don't Have Account?</span>
        <Link
          to={ROUTES.SIGNUP}
          className="text-xs font-bold text-yellow-500 hover:text-yellow-400 transition-colors underline underline-offset-2"
        >
          Sign up
        </Link>
      </div>

      {/* Disclaimer */}
      <div
        className="rounded-lg px-4 py-3 mt-1"
        style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <p className="text-[10px] leading-relaxed text-zinc-500">{DISCLAIMER_TEXT}</p>
      </div>
    </div>
  );
};

export default LoginPage;
