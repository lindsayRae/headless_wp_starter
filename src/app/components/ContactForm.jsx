'use client';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '@/utils/send-email';
import { sendMail, sendBrevoEmail } from '@/services/sendMail';

function ContactForm() {
  const formRef = useRef(null); // Create a ref for the form element
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  });
  async function onSubmit(data) {
    console.log('submit data - ', data);
    try {
      const result = await sendEmail(data);
      // currently comes back undefined and reset does not work
      console.log('result - ', result);
      if (result) {
        formRef.current.reset(); // Reset the form if the submission is successful
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  async function handleOnClick() {
    console.log('on click heard');
    let response = await sendMail('https://craftcode.design/');
    console.log('in fomr component.. ', response);
  }
  async function handleOnClickBrevo() {
    sendBrevoEmail();
    // let response = await sendMail('https://craftcode.design/');
    // console.log('in fomr component.. ', response);
  }
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48'
      >
        <div className='mx-auto max-w-xl lg:mr-0 lg:max-w-lg'>
          <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
            <div>
              <label
                htmlFor='firstName'
                className='block text-sm font-semibold leading-6 text-white'
              >
                First name
              </label>
              <div className='mt-2.5'>
                <input
                  type='text'
                  className='block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  {...register('firstName', { required: 'This is required' })}
                  suppressHydrationWarning
                />
                <p>{errors.firstName?.message}</p>
              </div>
            </div>
            <div>
              <label
                htmlFor='lastName'
                className='block text-sm font-semibold leading-6 text-white'
              >
                Last name
              </label>
              <div className='mt-2.5'>
                <input
                  type='text'
                  className='block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  {...register('lastName', { required: 'This is required' })}
                  suppressHydrationWarning
                />
                <p>{errors.lastName?.message}</p>
              </div>
            </div>
            <div className='sm:col-span-2'>
              <label
                htmlFor='email'
                className='block text-sm font-semibold leading-6 text-white'
              >
                Email
              </label>
              <div className='mt-2.5'>
                <input
                  type='email'
                  className='block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  {...register('email', { required: 'This is required' })}
                  suppressHydrationWarning
                />
                <p>{errors.email?.message}</p>
              </div>
            </div>
            {/* <div className='sm:col-span-2'>
              <label
                htmlFor='phone-number'
                className='block text-sm font-semibold leading-6 text-white'
              >
                Phone number
              </label>
              <div className='mt-2.5'>
                <input
                  type='tel'
                  name='phone-number'
                  id='phone-number'
                  autoComplete='tel'
                  className='block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  {...register('phone', { required: true })}
                />
              </div>
            </div> */}
            <div className='sm:col-span-2'>
              <label
                htmlFor='message'
                className='block text-sm font-semibold leading-6 text-white'
              >
                Message
              </label>
              <div className='mt-2.5'>
                <textarea
                  rows={4}
                  className='block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
                  defaultValue={''}
                  {...register('message', { required: 'This is required' })}
                  suppressHydrationWarning
                />
                <p>{errors.message?.message}</p>
              </div>
            </div>
          </div>
          <div className='mt-8 flex justify-end'>
            <button
              type='submit'
              className='rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
            >
              Send message
            </button>
          </div>
        </div>
      </form>
      <div className='ml-4'>
        <h2 className='mb-4'>Testing Brevo</h2>
        <input
          readOnly
          type='text'
          value='https://craftcode.design/'
          className='block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6'
        />
        <button
          className='rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-4'
          onClick={() => handleOnClick()}
        >
          Send me this url
        </button>
      </div>
      <div className='ml-4 mt-6'>
        <h2 className='mb-4'>Testing Brevo API</h2>

        <button
          className='rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-4'
          onClick={() => handleOnClickBrevo()}
        >
          Send Email
        </button>
      </div>
    </div>
  );
}

export default ContactForm;
