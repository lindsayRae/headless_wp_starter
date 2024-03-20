// import axios from 'axios';

// export const sendMail = async (link) => {
//   try {
//     let request = await axios
//       .post('/api/email', {
//         name: 'TesterLindsay',
//         email: 'lbarnett712@gmail.com',
//         subject: 'Someone sent you a Link.',
//         link: link,
//       })
//       .then((res) => {
//         return res;
//       });
//     return request.status === 200 ? true : false;
//   } catch (err) {
//     console.error(err);
//   }
// };

export const sendBrevoEmail = async () => {
  const apiKey = process.env.NEXT_PUBLIC_BREVO_API; // Replace 'YOUR_API_KEY' with your actual API key
  console.log('API', apiKey);
  const url = 'https://api.brevo.com/v3/smtp/email';
  const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey,
  };

  const postData = {
    sender: {
      name: 'Lindsay from edocew',
      email: 'lindsay.aiello@edocew.com',
    },
    to: [
      {
        email: 'lbarnett712@gmail.com',
        name: 'Lindsay',
      },
    ],
    htmlContent:
      '<!DOCTYPE html> <html> <body> <h1>This is sample email from the contact page</h1> </html>',
    subject: 'Contact Form',
    replyTo: {
      email: 'lindsay.aiello@edocew.com',
      name: 'Lindsay',
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};
