const { OAuth2Client } = require("google-auth-library");
const { google } = require('googleapis');
const useCases = require('../../use-cases');
// const axios = require('axios');
const CLIENT_ID ='44296329626-rhukh8qus0oabhccsbhjlnfgqbicvnfc.apps.googleusercontent.com'
const CLIENT_SECRET = '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';
const REDIRECT_URI = "http://localhost:8085/auth/google/callback";

const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
const makeAuthenticationAction=require("./authentication");

const autheticationAction=makeAuthenticationAction({
    client,
    createUser: useCases.users.createUser,
    findId:useCases.users.findId,
    fetchGmailFolders:useCases.folders.fetchGmailFolders,
});

const authAction = Object.freeze({
    googleAuthLogin:autheticationAction.googleAuthLogin,
    googleAuthCallback:autheticationAction.googleAuthCallback
});

module.exports=authAction;
