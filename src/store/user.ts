import { createSlice, createAsyncThunk, Action } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { apiRequestFailed } from './tasks';
import { authService, userDetails } from '../services/auth.service';
import axios, { AxiosError } from 'axios';

export const userLogin = createAsyncThunk(
  'user/login',
  async (userDetails: userDetails, { rejectWithValue }) => {
    try {
      const user = await axios.post(`http://localhost:5000/login`, userDetails);

      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${user.data.token}`;
      localStorage.setItem('token', user.data.token);
      localStorage.setItem('refreshToken', user.data.refreshToken);
      return user.data.user;
    } catch (error: any) {
      // return custom error message from API if any
      // console.log('error', error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export interface iUser {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: iUser = {
  user: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    apiRequested: (state, action) => {
      state.loading = true;
    },
    apiFailed: (state, action) => {
      state.loading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
  extraReducers: {
    [`${userLogin.pending}`]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [`${userLogin.fulfilled}`]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    },
    [`${userLogin.rejected}`]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { apiRequested, apiFailed, setUser } = userSlice.actions;
export default userSlice.reducer;

// export const login = (userDetails: userDetails) => async (dispatch: any) => {
//   dispatch(apiRequested);
//   try {
//     const user = await authService.login(userDetails);
//     dispatch(setUser(user));
//   } catch (error) {
//     dispatch(apiFailed(error));
//   }
// };
