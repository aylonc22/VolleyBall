import axios from 'axios';

interface userDetails {
  UserName: string;
  Password: string;
}

const login = (userDetails: userDetails) => {
  const result = axios
    .post(`http://localhost:5000/login`, userDetails)
    .then((res) => {
      console.log('res', res);
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.token}`;
      localStorage.setItem('jwt', res.data.token);
      localStorage.setItem('refresh', res.data.refreshToken);
    })
    .catch((err) => {
      console.log('err', err);
    });
};

const logout = () => {
  const refreshToken = localStorage.getItem('refresh');
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
  const refreshToken = localStorage.getItem('refresh');
  const result = axios
    .post(`http://localhost:5000/token`, { Token: refreshToken })
    .then((res) => {
      localStorage.setItem('jwt', res.data.accessToken);
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
  logout,
  refreshToken,
};
