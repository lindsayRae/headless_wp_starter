'use client';
import { useForm, SubmitHandler } from 'react-hook-form'; // doesn't use react state so entire pages does NOT rerender after form input changes

import { sendEmail } from '@/app/_actions';
import { toast } from 'sonner';
import { yupResolver } from '@hookform/resolvers/yup';

import { ContactFormSchema } from '@/lib/schema';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ContactFormSchema),
  });

  const processForm = async (data) => {
    console.log('--- data', data);

    const result = await sendEmail(data);

    if (result?.success) {
      console.log({ data: result.data });
      toast.success('Email sent!');
      reset();
      return;
    }

    // toast error
    console.log(result?.error);
    toast.error('Something went wrong!');
  };

  return (
    <div className='mx-auto max-w-xl lg:mx-0 lg:max-w-lg'>
      <form
        onSubmit={handleSubmit(processForm)}
        className='flex flex-1 flex-col gap-4 px-6 pt-36 pb-6 lg:px-8 text-black'
      >
        <h2 className='mb-4 text-3xl font-bold tracking-tight text-white'>
          Testing Hamed video
        </h2>
        <div>
          <input
            placeholder='name'
            className='w-full rounded-lg '
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name?.message && (
            <p className='ml-1 mt-1 text-sm text-red-400'>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <input
            placeholder='email'
            className='w-full rounded-lg'
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email?.message && (
            <p className='ml-1 mt-1 text-sm text-red-400'>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            rows={5}
            cols={5}
            placeholder='message'
            className='w-full rounded-lg'
            {...register('message')}
          />
          {errors.message?.message && (
            <p className='ml-1 text-sm text-red-400'>
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className='rounded-lg border border-black bg-black py-2.5 font-medium text-white transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
