import {html, LitElement} from 'lit-element';
import oktaSignIn from '../okta/okta-config';
import {Router} from '@vaadin/router';

export class PrivateComponent extends LitElement {

  firstUpdated() {
    oktaSignIn.authClient.token.getUserInfo().then(
      (user) => {
      },
      () => {
        Router.go('/login');
      });
  }

  render() {
    return html
      `
        <slot></slot>
        <button @click='${this._onLogOut}'>Logout</button>
      `
      ;
  }

  async _onLogOut() {
    await oktaSignIn.authClient.signOut();
  }
}

window.customElements.define('private-component', PrivateComponent);