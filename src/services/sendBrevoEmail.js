export const sendBrevoEmail = async () => {
  const apiKey = process.env.NEXT_PUBLIC_BREVO_API;

  const url = process.env.NEXT_PUBLIC_EMAIL_URL;

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
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(postData),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};
