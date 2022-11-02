import {css, html, LitElement} from 'lit-element';
import oktaSignIn from '../okta/okta-config';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import {Router} from '@vaadin/router';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class OktaLogin extends LitElement {
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
      isLogoutVisible: {type: Boolean}
    };
  }

  firstUpdated() {
    oktaSignIn.authClient.token.getUserInfo().then(
      (user) => {
        Router.go('/home');
      },
      () => {
        oktaSignIn
          .showSignInToGetTokens({
            el: '#okta-login-container'
          })
          .then((tokens) => {
            oktaSignIn.authClient.tokenManager.setTokens(tokens);
            oktaSignIn.remove();
            Router.go('/home');
          })
          .catch(function(err) {
            console.error(err);
          });
      }
    );
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

}

window.customElements.define('okta-login', OktaLogin);
