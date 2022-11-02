import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

const oktaConfig = {
  issuer: 'https://dev-74151855.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3000/home',
  clientId: '0oa72xgf364QeaaE75d7',
  useInteractionCodeFlow: true,
  scopes: ['openid', 'profile', 'email'],
};

const oktaSignIn = new OktaSignIn(oktaConfig);

export default oktaSignIn;
