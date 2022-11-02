import {html, LitElement} from 'lit-element';
import {Router} from '@vaadin/router';
import './okta-login';
import './okta-home';
import './private-component';

class AppComponent extends LitElement {
  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('router-outlet'));
    router.setRoutes([
      {path: '/login', component: 'okta-login'},
      {path: '/', component: 'okta-login'},
      {
        path: '/', component: 'private-component', children: [
          {path: '/home', component: 'okta-home'},
        ]
      }
    ]);
  }

  render() {
    return html`
      <div id='router-outlet'></div>`;
  }
}

window.customElements.define('app-component', AppComponent);
