import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { HiOutlineCurrencyRupee, HiOutlineArrowLeft } from 'react-icons/hi';
import { useAppDispatch } from '@/hooks/useAppSelector';
import { depositSuccess } from '@/features/wallet/slices/walletSlice';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const schema = z.object({
  amount: z.coerce.number().min(100, { message: 'Minimum deposit is ₹100' }).max(500000, { message: 'Maximum deposit is ₹500,000' }),
  method: z.string().min(1, { message: 'Select a deposit gateway method' }),
});

type Fields = z.infer<typeof schema>;

export const DepositPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const methods = [
    { id: 'upi', name: 'UPI Gateway', subtitle: 'PhonePe, GPay, Paytm', icon: '📱' },
    { id: 'bank', name: 'NetBanking / IMPS', subtitle: 'HDFC, ICICI, SBI', icon: '🏦' },
    { id: 'crypto', name: 'USDT / Crypto', subtitle: 'TRC20, ERC20 Network', icon: '🪙' },
  ];

  const quickAmounts = [500, 1000, 5000, 10000, 25000];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { amount: 1000, method: 'upi' },
  });

  const selectedMethod = watch('method');

  const onSubmit = async (data: Fields) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      dispatch(depositSuccess({ amount: data.amount }));
      toast.success(`Deposit request of ₹${data.amount.toLocaleString()} processed successfully!`);
      navigate(ROUTES.WALLET);
    } catch (err) {
      toast.error('Deposit processing failed.');
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
          Deposit Credit
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Top up your casino ledger balance instantly using secure channels
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-2">
        {/* Method Picker */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            1. Choose Deposit Gateway
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {methods.map((m) => {
              const isSelected = selectedMethod === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setValue('method', m.id)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-3.5 select-none ${
                    isSelected
                      ? 'border-gold-primary bg-gold-primary/5 shadow-gold'
                      : 'border-white/5 bg-zinc-900/40 hover:border-white/10'
                  }`}
                >
                  <span className="text-2xl select-none leading-none">{m.icon}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-white uppercase tracking-wide">
                      {m.name}
                    </span>
                    <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-widest mt-0.5">
                      {m.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {errors.method && <span className="text-xs text-red-500">{errors.method.message}</span>}
        </div>

        {/* Amount Input */}
        <div className="flex flex-col gap-3">
          <Input
            {...register('amount')}
            type="number"
            label="2. Deposit Amount (INR)"
            placeholder="Min ₹100, Max ₹500,000"
            error={errors.amount?.message}
            icon={<HiOutlineCurrencyRupee className="h-5 w-5" />}
          />

          {/* Quick selectors */}
          <div className="flex flex-wrap gap-2.5">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setValue('amount', amt)}
                className="px-3.5 py-2 rounded-lg bg-zinc-900 border border-white/5 hover:border-gold-primary/30 text-xs font-black text-zinc-300 hover:text-white transition-all cursor-pointer"
              >
                + ₹{amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <Button variant="gold" size="lg" type="submit" isLoading={isLoading} className="py-3.5 uppercase tracking-widest text-xs font-black mt-2">
          Verify & Authorize Deposit
        </Button>
      </form>
    </div>
  );
};
export default DepositPage;
