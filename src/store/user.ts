import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import { apiRequestFailed } from './tasks';

const initialState = {
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
    },
  },
});

export const { apiRequested, apiFailed, setUser } = userSlice.actions;
export default userSlice.reducer;

const url = '/login';
export const login = () => {
  apiCallBegan({});
};
