import { getItem } from './asyncStorage';
const domain = 'http://localhost:1337';
const newUser = {
  email: 'test@gmail.com',
  password: 'testuser',
};

export async function getAuthToken() {
  const url = `${domain}/auth/token`;
  const requestOption = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  };

  let token = await fetch(url, requestOption);
  token = await token.json();
  return token;
}

export async function fetchWithAuth(url, method = 'get', data = null) {
  const token = await getItem('jwt');
  const requestOption = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      jwt: token,
    },
  };

  if (data) {
    requestOption.body = JSON.stringify(data);
  }

  const response = await fetch(domain + url, requestOption);
  return await response.json();
}
