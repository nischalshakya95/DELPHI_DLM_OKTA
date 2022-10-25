import {css, html, LitElement} from 'lit-element';
import oktaSignIn from './okta/okta-config';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import {authenticate} from './service/okta-service';

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
      isLogoutVisible: {type: Boolean},
    };
  }

  firstUpdated() {
    oktaSignIn.authClient.token.getUserInfo().then(
      (user) => {
        authenticate()
          .then((response) => {
            document.getElementById('messageBox').innerHTML =
              'Hello, ' +
              response.data.email +
              '! You are *still* logged in! :)';
          })
          .catch((error) => {
            document.getElementById('messageBox').innerHTML =
              'Hello, ' + user.email + '! You are *still* logged in! :)';
          });
        this.isLogoutVisible = true;
      },
      () => {
        oktaSignIn
          .showSignInToGetTokens({
            el: '#okta-login-container',
          })
          .then((tokens) => {
            oktaSignIn.authClient.tokenManager.setTokens(tokens);
            oktaSignIn.remove();

            authenticate().then((response) => {
              document.getElementById('messageBox').innerHTML =
                'Hello, ' +
                response.data.email +
                '! You are *still* logged in! :)';
            });
            this.isLogoutVisible = true;
          })
          .catch(function (err) {
            console.error(err);
          });
      }
    );
  }

  constructor() {
    super();
    this.isLogoutVisible = false;
  }

  render() {
    return html`
      ${this.isLogoutVisible
        ? html` <button @click="${this._onLogout}">Logout</button>`
        : ''}
      <slot></slot>
    `;
  }

  async _onLogout() {
    this.isLogoutVisible = false;
    await oktaSignIn.authClient.signOut();
  }
}

window.customElements.define('my-element', MyElement);
