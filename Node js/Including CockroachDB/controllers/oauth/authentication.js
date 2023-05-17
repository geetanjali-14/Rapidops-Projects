const { google } = require("googleapis");
const fetchGmailFolders = require("../../use-cases/folders/fetchGmailFolders");

function makeAuthenticationAction({
  createUser,
  client,
  findId,
  fetchGmailFolders,
}) {
  return Object.freeze({
    googleAuthLogin,
    googleAuthCallback,
  });

  function googleAuthLogin(req, res) {
    try {
      const authUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: [
          "email",
          "profile",
          "https://mail.google.com/",
          "https://www.googleapis.com/auth/gmail.send",
          "https://www.googleapis.com/auth/gmail.readonly",
          "https://www.googleapis.com/auth/gmail.compose",
          "https://www.googleapis.com/auth/gmail.modify",
        ],
      });
      console.log(authUrl);
      res.redirect(authUrl);
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
  async function googleAuthCallback(req, res) {
    const { code } = req.query;

    try {
      const { tokens } = await client.getToken(code);
      console.log("Token", tokens);
      console.log("Refresh_Token", tokens.refresh_token);

      client.setCredentials(tokens);

      const { data } = await client.request({
        url: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        method: "GET",
      });
      console.log("Google data received : ", data);

      const database_name = "email_client";
      const result = await createUser({
        name: data.name,
        email: data.email,
        password: "password",
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date,
        database_name,
      });
      console.log("User data", result);

      const access_token = tokens.access_token;
      const refresh_token = tokens.refresh_token;
      console.log("Got access token ", access_token);
      console.log("Got refresh token ", refresh_token);

      const email = data.email;
      const user_id = await findId({ email, database_name });

      await fetchGmailFolders({ user_id, access_token,refresh_token });
      console.log("Inside authentication.js ");

    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
}

module.exports = makeAuthenticationAction;
