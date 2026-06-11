import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { HiOutlineArrowLeft, HiOutlineCloudUpload } from 'react-icons/hi';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';

const schema = z.object({
  idType: z.string().min(1, { message: 'Please select an identification document type' }),
  idNumber: z.string().min(5, { message: 'Document serial number is required' }),
});

type Fields = z.infer<typeof schema>;

export const KycPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);

  const documentOptions = [
    { value: 'aadhaar', label: 'Aadhaar Card (India)' },
    { value: 'pan', label: 'PAN Card (India)' },
    { value: 'passport', label: 'Passport (Global)' },
    { value: 'license', label: 'Driving License' },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    resolver: zodResolver(schema),
    defaultValues: { idType: 'aadhaar', idNumber: '' },
  });

  const onSubmit = async (data: Fields) => {
    if (!fileUploaded) {
      toast.error('Please drag/drop or upload your document file photo first.');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('KYC documents submitted successfully! Audits complete within 24 hours.');
      navigate(ROUTES.PROFILE);
    } catch (err) {
      toast.error('KYC submission failed. Please try again.');
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
          Verify Legal Identity (KYC)
        </h2>
        <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">
          Verify identity parameters to clear cash out limits and comply with security rules
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            {...register('idType')}
            label="Document Identity Type"
            options={documentOptions}
            error={errors.idType?.message}
          />

          <Input
            {...register('idNumber')}
            label="Document Serial Number"
            placeholder="e.g. 1234 5678 9012"
            error={errors.idNumber?.message}
          />
        </div>

        {/* Upload Area */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Upload Document Image
          </label>
          <div
            onClick={() => setFileUploaded(true)}
            className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
              fileUploaded
                ? 'border-gold-primary bg-gold-primary/5 text-gold-primary'
                : 'border-white/5 bg-zinc-900/40 hover:border-white/10 text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <HiOutlineCloudUpload className="h-10 w-10 mb-3" />
            {fileUploaded ? (
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-xs font-bold uppercase text-white">Document file loaded</span>
                <span className="text-[10px] text-zinc-500 font-medium">Click to select a different file photo</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-xs font-bold uppercase">Drag & drop or browse photos</span>
                <span className="text-[10px] text-zinc-600 font-medium">JPEG, PNG or PDF up to 5MB size limit</span>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <Button variant="gold" size="lg" type="submit" isLoading={isLoading} className="py-3.5 uppercase tracking-widest text-xs font-black mt-2">
          Submit KYC Audit Details
        </Button>
      </form>
    </div>
  );
};
export default KycPage;
