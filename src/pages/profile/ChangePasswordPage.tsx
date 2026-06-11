import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { HiOutlineLockClosed, HiOutlineArrowLeft } from 'react-icons/hi';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { PasswordInput } from '@/components/ui/PasswordInput';

const schema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z.string().min(6, { message: 'New password must be at least 6 characters' }),
    confirmPassword: z.string().min(1, { message: 'Please confirm your new password' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type Fields = z.infer<typeof schema>;

export const ChangePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async (data: Fields) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success('Password updated successfully!');
      navigate(ROUTES.PROFILE);
    } catch (err) {
      toast.error('Failed to change password. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left max-w-2xl mx-auto w-full">
      <button
        onClick={() => navigate(ROUTES.PROFILE)}
        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors self-start uppercase tracking-wider"
      >
        <HiOutlineArrowLeft className="h-4.5 w-4.5" />
        Back to Profile
      </button>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          Change Password
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Modify active password parameters regularly to protect credentials databases
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5 mt-2">
        <PasswordInput
          {...register('currentPassword')}
          label="Current Password"
          placeholder="••••••••"
          error={errors.currentPassword?.message}
          icon={<HiOutlineLockClosed className="h-5 w-5" />}
        />

        <PasswordInput
          {...register('newPassword')}
          label="New Password"
          placeholder="••••••••"
          error={errors.newPassword?.message}
          icon={<HiOutlineLockClosed className="h-5 w-5" />}
        />

        <PasswordInput
          {...register('confirmPassword')}
          label="Confirm New Password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          icon={<HiOutlineLockClosed className="h-5 w-5" />}
        />

        <Button variant="gold" size="lg" type="submit" isLoading={isLoading} className="py-3.5 uppercase tracking-widest text-xs font-black mt-2">
          Update Security Password
        </Button>
      </form>
    </div>
  );
};
export default ChangePasswordPage;
