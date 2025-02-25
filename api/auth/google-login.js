module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.redirect('https://accounts.google.com/o/oauth2/v2/auth?client_id=510608755501-ucl194dpbraertmqp8188bb7muh1b5oh.apps.googleusercontent.com&redirect_uri=https://kiinteistomaailma.norr3.fi/api/auth/google-callback&response_type=code&scope=email profile');
};