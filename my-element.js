/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {LitElement, html, css} from 'lit-element';
import axios from 'axios';
import qs from 'qs';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
        max-width: 800px;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       */
      name: {type: String},

      /**
       * The number of times the button has been clicked.
       */
      count: {type: Number},

      oktaAuth: {type: Object},

      OktaSignIn: {type: Object},

      oktaConfig: {type: Object},
    };
  }

  firstUpdated() {
    this.oktaConfig = {
      clientId: '0oa6ucohpvmcyHVGU5d7',
      issuer: 'https://dev-74151855.okta.com/oauth2/default',
      redirectUri: `${window.location.origin}`,
      scopes: ['openid', 'profile', 'email'],
      useInteractiveCodeFlow: true,
      pkce: false
    };
    const oktaSignIn = new OktaSignIn(this.oktaConfig);

    oktaSignIn.authClient.token.getUserInfo().then(
      function (user) {
        console.log(user);
        document.getElementById('messageBox').innerHTML =
          'Hello, ' + user.email + '! You are *still* logged in! :)';
        document.getElementById('logout').style.display = 'block';
      },
      function (error) {
        oktaSignIn
          .showSignInToGetTokens({
            el: '#okta-login-container',
          })
          .then(function (tokens) {
            console.log(tokens);
            oktaSignIn.authClient.tokenManager.setTokens(tokens);
            oktaSignIn.remove();

            const idToken = tokens.idToken;
            document.getElementById('messageBox').innerHTML =
              'Hello, ' + idToken.claims.email + '! You just logged in! :)';
            document.getElementById('logout').style.display = 'block';
          })
          .catch(function (err) {
            console.error(err);
          });
      }
    );
  }

  constructor() {
    super();
  }

  render() {
    return html` <slot></slot> `;
  }

  async _onLogin() {
    await this.oktaAuth.signInWithRedirect();
    this._getCode();
  }

  async _onLogout() {
    await this.oktaAuth.signOut();
  }

  _getCode() {
    let searchParams = new URLSearchParams(window.location.search);
    let code = searchParams.get('code');
    let transactionStorage = JSON.parse(
      localStorage.getItem('okta-shared-transaction-storage')
    );
    let transactionStorageValues = Object.values(transactionStorage);
    let codeVerifier =
      transactionStorageValues[transactionStorageValues.length - 1].transaction
        .codeVerifier;
    let tokenURL = 'https://dev-74151855.okta.com/oauth2/default/v1/token';
    let data = {
      grant_type: 'authorization_code',
      client_id: '0oa6ucohpvmcyHVGU5d7',
      redirect_uri: 'http://localhost:3000',
      code_verifier: codeVerifier,
      code: code,
    };
    axios
      .post(tokenURL, qs.stringify(data))
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }

  _getOktaToken() {
    let accessToken = this.oktaAuth.getAccessToken();
    console.log(accessToken);
  }
}

window.customElements.define('my-element', MyElement);
