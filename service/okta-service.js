import axios from 'axios';
import {getValueFromLocalStorage} from '../utility/localstorage';

export async function authenticate() {
  let {accessToken} = getValueFromLocalStorage('okta-token-storage');
  return await axios.get('http://localhost:8080/api/v1/authenticate', {
    headers: {
      Authorization: `Bearer ${accessToken.accessToken}`
    }
  });
}

export async function getTokenInfo() {
  let {accessToken} = getValueFromLocalStorage('okta-token-storage');

  return await axios.get('http://localhost:8080/api/v1/token_info', {
    headers: {
      Authorization: `Bearer ${accessToken.accessToken}`
    }
  });

}