const ContactFormEmail = ({ name, email, message }) => (
  <div>
    <h1>Lead from website</h1>
    <p>
      From <strong>{name}</strong> at {email}
    </p>
    <h2>Message:</h2>
    <p>{message}</p>
  </div>
);

export default ContactFormEmail;
