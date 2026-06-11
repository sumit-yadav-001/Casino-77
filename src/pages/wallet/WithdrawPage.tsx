import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { HiOutlineCurrencyRupee, HiOutlineArrowLeft } from 'react-icons/hi';
import { useAppSelector, useAppDispatch } from '@/hooks/useAppSelector';
import { selectBalance, withdrawSuccess } from '@/features/wallet/slices/walletSlice';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/utils/formatters';

const schema = z.object({
  amount: z.coerce.number().min(500, { message: 'Minimum withdrawal is ₹500' }),
  upiId: z.string().min(5, { message: 'Enter a valid UPI ID (e.g. name@bank)' }),
});

type Fields = z.infer<typeof schema>;

export const WithdrawPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const balance = useAppSelector(selectBalance);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { amount: 1000, upiId: '' },
  });

  const onSubmit = async (data: Fields) => {
    if (data.amount > balance.available) {
      toast.error('Withdrawal amount exceeds available balance.');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      dispatch(withdrawSuccess({ amount: data.amount }));
      toast.success(`Withdrawal request of ₹${data.amount.toLocaleString()} submitted!`);
      navigate(ROUTES.WALLET);
    } catch (err) {
      toast.error('Withdrawal request failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left max-w-2xl mx-auto w-full">
      <button
        onClick={() => navigate(ROUTES.WALLET)}
        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-white transition-colors self-start uppercase tracking-wider"
      >
        <HiOutlineArrowLeft className="h-4.5 w-4.5" />
        Back to Ledger
      </button>

      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
          Withdraw Winnings
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Transfer your available cashout balance safely back to your personal accounts
        </p>
      </div>

      <div className="border border-white/5 bg-zinc-950/40 p-5 rounded-2xl flex items-center justify-between mb-2">
        <div className="flex flex-col gap-1">
          <span className="text-[9.5px] font-bold text-zinc-500 uppercase tracking-widest">
            Playable Cash Out Available
          </span>
          <h3 className="text-2xl font-black text-gold-primary">
            {formatCurrency(balance.available, balance.currency)}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setValue('amount', balance.available)}
          className="px-3.5 py-1.5 rounded-lg border border-gold-primary/30 bg-gold-primary/5 hover:bg-gold-primary/15 text-gold-primary text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
        >
          Withdraw Max
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-2">
        {/* Amount */}
        <Input
          {...register('amount')}
          type="number"
          label="1. Cashout Amount (INR)"
          placeholder="Min ₹500"
          error={errors.amount?.message}
          icon={<HiOutlineCurrencyRupee className="h-5 w-5" />}
        />

        {/* UPI Details */}
        <Input
          {...register('upiId')}
          label="2. UPI ID for Payout"
          placeholder="e.g. name@okhdfcbank or 9876543210@paytm"
          error={errors.upiId?.message}
          icon={<span className="text-zinc-500 font-sans text-xs font-bold">UPI</span>}
          className="pl-[48px]"
        />

        {/* Submission */}
        <Button variant="gold" size="lg" type="submit" isLoading={isLoading} className="py-3.5 uppercase tracking-widest text-xs font-black mt-2">
          Verify & Request Withdrawal
        </Button>
      </form>
    </div>
  );
};
export default WithdrawPage;
