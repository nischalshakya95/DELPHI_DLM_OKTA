import {html, LitElement} from 'lit-element';
import {getUserInfo} from '../service/okta-service';

export class OktaHome extends LitElement {

  static get properties() {
    return {
      user: {type: Object},
      isLoading: {type: Boolean}
    };
  }

  constructor() {
    super();
    this.isLoading = true;
  }

  firstUpdated() {
    getUserInfo().then((user) => {
      this.user = user.data;
      this.isLoading = false;
    }).catch((error) => console.log(error));
  }

  render() {
    return !this.isLoading ? html`
      <h2>Welcome ${this.user?.email}</h2>` : html`<h1>Loading</h1>`;
  }
}

window.customElements.define('okta-home', OktaHome);
