'use server';
import { Resend } from 'resend';
import { ContactFormSchema, FormDataSchema } from '@/lib/schema';
import ContactFormEmail from '@/emails/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data) {
  // const result = ContactFormSchema(data);
  // if (result.success) {
  // const { name, email, message } = result.data;
  try {
    console.log('MADE IT>.. ');
    const dummy = {
      name: 'Lindsay',
      email: 'lbarnett712@gmail.com',
      message: 'This is a test',
    };
    const data = await resend.emails.send({
      from: 'lead@edocew.com',
      to: ['lindsay.aiello@edocew.com'],
      subject: 'Contact form submission',
      // text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      text: `Name: ${dummy.name}\nEmail: ${dummy.email}\nMessage: ${dummy.message}`,
      //react: ContactFormEmail({ name, email, message }),
      react: ContactFormEmail({
        name: dummy.name,
        email: dummy.email,
        message: dummy.message,
      }),
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
  // }
  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
