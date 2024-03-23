'use server';
import { Resend } from 'resend';
import { ContactFormSchema } from '@/lib/schema';
import ContactFormEmail from '@/emails/contact-form-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data) {
  const result = await ContactFormSchema.validate(data);

  if (result) {
    const { name, email, message } = result;
    try {
      const data = await resend.emails.send({
        from: 'lead@edocew.com',
        to: ['lindsay.aiello@edocew.com'],
        subject: 'Contact form submission',
        // text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        react: ContactFormEmail({ name, email, message }),
      });
      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }
  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
