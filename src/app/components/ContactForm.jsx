'use client';
import React, { useRef, useState, FormEvent } from 'react';
// import { useForm } from 'react-hook-form';
import { sendEmail } from '@/utils/send-email';
import { sendBrevoEmail } from '@/services/sendBrevoEmail';

function ContactForm() {
  //const formRef = useRef(null); // Create a ref for the form element
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     message: '',
  //   },
  // });
  const [data, setData] = useState();
  // async function onSubmit(data) {
  //   console.log('submit data - ', data);
  //   // try {
  //   //   const result = await sendEmail(data);
  //   //   // currently comes back undefined and reset does not work
  //   //   console.log('result - ', result);
  //   //   if (result) {
  //   //     formRef.current.reset(); // Reset the form if the submission is successful
  //   //   }
  //   // } catch (error) {
  //   //   console.error('Error submitting form:', error);
  //   // }
  // }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData);
    console.log(formDataObject);
    // validate data here...

    const data = await fetch('/api/form', {
      method: 'POST',
      body: JSON.stringify(formDataObject),
    }).then((res) => res.json());

    setData(data);
    form.reset();
  };
  async function handleOnClickBrevo() {
    sendBrevoEmail();
  }
  return (
    <div>
      {/* <form
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
      </form> */}
      <section className='gap-6'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-1 flex-col gap-4 sm:w-1/2 px-6 pt-36 pb-6 lg:px-8 '
        >
          <h2 className='mb-4'>Testing Hamed video</h2>
          <input
            className='rounded-lg'
            name='name'
            placeholder='name'
            required
          />
          <input
            className='rounded-lg'
            name='message'
            placeholder='message'
            required
          />
          <button className='rounded-lg bg-black py-2 text-white'>
            Submit
          </button>
        </form>

        <div className='rounded-lg bg-cyan-600 p-8 text-white mx-6'>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </section>
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
