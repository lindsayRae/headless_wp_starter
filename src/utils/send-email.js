export async function sendEmail(data) {
  const apiEndpoint = '/api/email';

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      //   alert(response.message);
      return response;
    })
    .catch((err) => {
      console.error(err);
      alert(err);
      throw err; // Rethrow the error to be caught by the caller
    });
}
