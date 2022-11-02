import axios from 'axios';
import {getValueFromLocalStorage} from '../utility/localstorage';

/**
 * It gets the access token from local storage, and then uses it to make a request to the /api/v1/user-info endpoint
 * @returns The user's information.
 */
export async function getUserInfo() {
  let {accessToken} = getValueFromLocalStorage('okta-token-storage');
  return await axios.get('http://localhost:8080/api/v1/user-info', {
    headers: {
      Authorization: `Bearer ${accessToken.accessToken}`
    }
  });
}

/**
 * It makes a request to the `/api/v1/token_info` endpoint, passing the access token in the `Authorization` header
 * @returns The token info is being returned.
 */
export async function getTokenInfo() {
  let {accessToken} = getValueFromLocalStorage('okta-token-storage');

  return await axios.get('http://localhost:8080/api/v1/token_info', {
    headers: {
      Authorization: `Bearer ${accessToken.accessToken}`
    }
  });

}