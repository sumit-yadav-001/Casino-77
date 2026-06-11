import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { HiOutlineUser, HiOutlineMail, HiOutlineGift } from 'react-icons/hi';
import { useAppDispatch } from '@/hooks/useAppSelector';
import { setCredentials } from '@/features/auth/slices/authSlice';
import { signupSchema, type SignupFields } from '@/features/auth/schemas/signupSchema';
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

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      phone: '',
      phoneOtp: '',
      email: '',
      emailOtp: '',
      password: '',
      referralCode: '',
      termsAccepted: false,
    },
  });

  const currentPhone = watch('phone');
  const currentEmail = watch('email');

  const handleSendPhoneOtp = () => {
    if (!/^[0-9]{10}$/.test(currentPhone)) {
      toast.error('Enter a valid 10-digit phone number first.');
      return;
    }
    toast.success(`OTP sent to +91 ${currentPhone}`);
    setPhoneOtpSent(true);
  };

  const handleSendEmailOtp = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentEmail)) {
      toast.error('Enter a valid email address first.');
      return;
    }
    toast.success(`OTP sent to ${currentEmail}`);
    setEmailOtpSent(true);
  };

  const submitRegistrationForm = async (formData: SignupFields) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const newUser = {
        id: `u-${Date.now()}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        balance: 0,
        currency: 'INR',
        isVerified: false,
        kycStatus: 'pending' as const,
        referralCode: formData.referralCode || '',
        createdAt: new Date().toISOString(),
      };

      dispatch(
        setCredentials({
          user: newUser,
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        })
      );

      toast.success('Account created! Welcome to Rani555.');
      navigate(ROUTES.DASHBOARD);
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-3.5">
      {/* Tab switcher */}
      <Tabs
        tabs={AUTH_TABS}
        activeTab="signup"
        onChange={(tabId) => tabId === 'login' && navigate(ROUTES.LOGIN)}
      />

      {/* Heading */}
      <p className="text-xs font-semibold text-white">
        Create your account by following these simple steps.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(submitRegistrationForm)} className="flex flex-col gap-3">

        {/* First + Last name */}
        <div className="grid grid-cols-2 gap-2.5">
          <Input
            {...register('firstName')}
            label="First Name *"
            placeholder="User"
            error={errors.firstName?.message}
          />
          <Input
            {...register('lastName')}
            label="Last Name *"
            placeholder="Enter Last Name"
            error={errors.lastName?.message}
          />
        </div>

        {/* Username */}
        <Input
          {...register('username')}
          label="User Name *"
          placeholder="Enter your User name"
          error={errors.username?.message}
          icon={<HiOutlineUser className="h-4 w-4" />}
        />

        {/* Phone + Send OTP */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
            Phone Number *
          </label>
          <div className="flex gap-2 items-center">
            {/* Country prefix */}
            <div className="flex items-center gap-1.5 px-3 h-11 rounded-lg border border-zinc-800 bg-zinc-900 shrink-0">
              <span className="text-sm leading-none">🇮🇳</span>
              <span className="text-zinc-300 text-sm font-semibold">+91</span>
            </div>
            {/* Phone input */}
            <input
              {...register('phone')}
              type="tel"
              placeholder=""
              className="flex-1 h-11 bg-zinc-900 border border-zinc-800 text-sm text-white px-3 rounded-lg focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 placeholder:text-zinc-600 transition-all duration-200"
            />
            {/* Send OTP btn */}
            <button
              type="button"
              onClick={handleSendPhoneOtp}
              className="h-11 px-4 rounded-lg text-[11px] font-bold uppercase tracking-wide shrink-0 text-zinc-900 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #f5a623, #e8950f)' }}
            >
              {phoneOtpSent ? 'Resend' : 'Send OTP'}
            </button>
          </div>
          {errors.phone && (
            <span className="text-xs text-red-500 font-medium">{errors.phone.message}</span>
          )}
        </div>

        {/* Email + Send OTP */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
            Email *
          </label>
          <div className="flex gap-2 items-center">
            {/* Email input with icon */}
            <div className="relative flex-1">
              <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
              <input
                {...register('email')}
                type="email"
                placeholder="Enter your email"
                className="w-full h-11 bg-zinc-900 border border-zinc-800 text-sm text-white pl-9 pr-3 rounded-lg focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/20 placeholder:text-zinc-600 transition-all duration-200"
              />
            </div>
            {/* Send OTP btn */}
            <button
              type="button"
              onClick={handleSendEmailOtp}
              className="h-11 px-4 rounded-lg text-[11px] font-bold uppercase tracking-wide shrink-0 text-zinc-900 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #f5a623, #e8950f)' }}
            >
              {emailOtpSent ? 'Resend' : 'Send OTP'}
            </button>
          </div>
          {errors.email && (
            <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <PasswordInput
          {...register('password')}
          label="Password"
          placeholder="Enter Password"
          error={errors.password?.message}
        />

        {/* Referral Code */}
        <Input
          {...register('referralCode')}
          label="Referral Code"
          placeholder="Enter referral code"
          error={errors.referralCode?.message}
          icon={<HiOutlineGift className="h-4 w-4" />}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl font-bold text-sm text-zinc-900 mt-1 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #f5a623, #e8950f)' }}
        >
          {isSubmitting ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      {/* Login redirect */}
      <div className="flex items-center gap-1 justify-center">
        <span className="text-xs text-yellow-500/80 font-medium">Don't Have Account?</span>
        <Link
          to={ROUTES.LOGIN}
          className="text-xs font-bold text-yellow-500 hover:text-yellow-400 transition-colors underline underline-offset-2"
        >
          Log in
        </Link>
      </div>

      {/* Disclaimer */}
      <div
        className="rounded-lg px-4 py-3"
        style={{ background: 'rgba(0,0,0,0.35)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        <p className="text-[10px] leading-relaxed text-zinc-500 text-center">{DISCLAIMER_TEXT}</p>
      </div>
    </div>
  );
};

export default SignupPage;