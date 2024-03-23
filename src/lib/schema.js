import * as yup from 'yup';
// look at docs for specific syntax
export const ContactFormSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Email is required').required(),
  message: yup.string().min(6).required('Message is required'),
});
