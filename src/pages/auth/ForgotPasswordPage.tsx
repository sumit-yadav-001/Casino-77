import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { HiOutlineMail, HiOutlineArrowLeft } from 'react-icons/hi';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;

const DISCLAIMER_TEXT =
  'Disclaimer: Please note that Gambling involves a financial risk and could be addictive over time if not practised within limits. Only 18+ people should use the services and should use it responsibly. Players should be aware of any financial risk and govern themselves accordingly.';

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFields>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const submitPasswordResetRequest = async (formData: ForgotPasswordFields) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`Reset instructions sent to ${formData.email}`);
      setResetEmailSent(true);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Back link */}
      <button
        type="button"
        onClick={() => navigate(ROUTES.LOGIN)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-white transition-colors cursor-pointer self-start"
      >
        <HiOutlineArrowLeft className="h-4 w-4" />
        Back to Login
      </button>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-white">Forgot your password?</p>
        <p className="text-xs text-zinc-500">
          Enter your email address and we'll send you a reset link.
        </p>
      </div>

      {resetEmailSent ? (
        <div
          className="rounded-xl px-5 py-5 text-center"
          style={{
            background: 'rgba(212,175,55,0.06)',
            border: '1px solid rgba(212,175,55,0.15)',
          }}
        >
          <p className="text-sm text-zinc-300 font-medium leading-relaxed">
            Check your inbox — we've sent instructions to reset your password. If it doesn't arrive,
            check your spam folder.
          </p>
          <Link
            to={ROUTES.LOGIN}
            className="mt-4 inline-block text-xs font-bold text-yellow-500 hover:text-yellow-400 transition-colors underline underline-offset-2"
          >
            Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(submitPasswordResetRequest)} className="flex flex-col gap-4">
          <Input
            {...register('email')}
            label="Email Address"
            placeholder="Enter your email"
            type="email"
            error={errors.email?.message}
            icon={<HiOutlineMail className="h-4.5 w-4.5" />}
          />
          <Button
            variant="gold"
            size="lg"
            type="submit"
            isLoading={isSubmitting}
            className="w-full rounded-lg font-bold text-sm"
          >
            Send Reset Link
          </Button>
        </form>
      )}

      {/* Login redirect */}
      <div className="flex items-center gap-1 justify-center mt-1">
        <span className="text-xs text-zinc-500">Remember your password?</span>
        <Link
          to={ROUTES.LOGIN}
          className="text-xs font-bold text-yellow-500 hover:text-yellow-400 transition-colors underline underline-offset-2"
        >
          Log in
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

export default ForgotPasswordPage;
