import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { HiOutlineSupport, HiOutlineChevronDown } from 'react-icons/hi';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

const schema = z.object({
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters' }),
  category: z.string().min(1, { message: 'Please choose a support query category' }),
  message: z.string().min(15, { message: 'Message must be at least 15 characters' }),
});

type Fields = z.infer<typeof schema>;

export const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [faqExpanded, setFaqExpanded] = useState<Record<number, boolean>>({});

  const categories = [
    { value: 'deposit', label: 'Deposit Gateway Issues' },
    { value: 'withdrawal', label: 'Withdrawal Processing Delay' },
    { value: 'game', label: 'Gameplay Errors or RTP Queries' },
    { value: 'profile', label: 'Profile Security or KYC audits' },
  ];

  const faqs = [
    { q: 'How long does a withdrawal take to process?', a: 'Standard cash out transfers complete within 1-2 hours. Large jackpot queries or bank holidays may delay payouts up to 24 hours.' },
    { q: 'What is the minimum deposit amount?', a: 'The minimum ledger top up is ₹100 for UPI gateway, and ₹500 for bank NetBanking.' },
    { q: 'How does the 200% welcome bonus release?', a: 'Deposit bonuses credit to your bonus balance immediately. Credits release to available balance upon meeting 30x rollover conditions.' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { subject: '', category: 'deposit', message: '' },
  });

  const toggleFaq = (idx: number) => {
    setFaqExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const onSubmit = async (data: Fields) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Support ticket created successfully! Review logs under Tickets.');
      reset();
      navigate(ROUTES.TICKETS);
    } catch (err) {
      toast.error('Failed to submit support request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 text-left">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-wider">
            Client Support
          </h2>
          <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
            Submit support tickets or consult our database of frequently answered questions
          </p>
        </div>
        <button
          onClick={() => navigate(ROUTES.TICKETS)}
          className="px-4 py-2.5 text-[10px] font-black uppercase tracking-wider bg-white/5 border border-white/8 rounded-lg hover:border-gold-primary/45 text-zinc-300 hover:text-white transition-all cursor-pointer whitespace-nowrap"
        >
          View Active Tickets
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2 items-start">
        {/* Support Request Form */}
        <div className="bg-zinc-900/40 border border-white/5 p-6 rounded-2xl flex flex-col gap-4.5">
          <h3 className="text-sm font-black text-white uppercase tracking-wide mb-1">
            Create Support Ticket
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Select
              {...register('category')}
              label="Query Category"
              options={categories}
              error={errors.category?.message}
            />

            <Input
              {...register('subject')}
              label="Subject"
              placeholder="e.g. Deposit not credited reference ID"
              error={errors.subject?.message}
              icon={<HiOutlineSupport className="h-5 w-5" />}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Support Message
              </label>
              <textarea
                {...register('message')}
                rows={4}
                placeholder="Describe your issue with reference IDs, dates, and amounts..."
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-gold-primary/60 focus:ring-1 focus:ring-gold-primary/20 text-sm text-white px-4 py-3 rounded-lg focus:outline-none transition-all placeholder:text-zinc-600"
              />
              {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
            </div>

            <Button variant="gold" size="lg" type="submit" isLoading={isLoading} className="py-3.5 uppercase tracking-widest text-xs font-black mt-2">
              Submit Support Request
            </Button>
          </form>
        </div>

        {/* FAQs */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-black text-white uppercase tracking-wide mb-1">
            Frequently Asked Questions
          </h3>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isExpanded = !!faqExpanded[idx];
              return (
                <div
                  key={idx}
                  className="border border-white/5 bg-zinc-900/40 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 text-xs font-bold uppercase tracking-wider text-white hover:text-gold-primary transition-colors text-left focus:outline-none cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <HiOutlineChevronDown
                      className={`h-4.5 w-4.5 text-zinc-500 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4.5 text-xs text-zinc-400 leading-relaxed font-semibold">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SupportPage;
