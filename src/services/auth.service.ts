import axios from 'axios';
import api from './interceptor';

interface userDetails {
  UserName: string;
  Password: string;
}
interface googleAccount {
  email: string;
  familyName: string;
  givenName: string;
  googleId: string;
  imageUrl: string;
  name: string;
}

const login = (userDetails: userDetails) => {
  const result = axios
    .post(`http://localhost:5000/login`, userDetails)
    .then((res) => {
      console.log('res', res);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.token}`;
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('refreshToken', res.data.refreshToken);
    })
    .catch((err) => {
      console.error('err', err);
    });
};

const googleLogin = (googleAccount: googleAccount) => {
  try {
    const response = api
      .post('login', { Google: googleAccount })
      .then((res) => {
        console.log('res', res);
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${res.data.token}`;
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('refreshToken', res.data.refreshToken);
      });
  } catch (error) {
    // Handle error or redirect to login
  }
};

const logout = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const result = axios
    .post(`http://localhost:5000/logout`, {
      refreshToken: refreshToken,
    })
    .then((res) => {
      console.log('res logout', res.data);
    })
    .catch((err) => {
      console.log('err', err);
    });
};

const refreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const result = axios
    .post(`http://localhost:5000/token`, { Token: refreshToken })
    .then((res) => {
      localStorage.setItem('token', res.data.accessToken);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.accessToken}`;
    })
    .catch((err) => {
      console.log('err', err);
    });
};

export const authService = {
  login,
  googleLogin,
  logout,
  refreshToken,
};
