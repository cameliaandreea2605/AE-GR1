import { createSlice } from '@reduxjs/toolkit';
import { decodeToken } from '../../utils/decodeToken';

const initialState = {
  loggedIn: false,
  checkTokenLoading: true,
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.loggedIn = !!action.payload;
      
      if (action.payload) {
        state.user = decodeToken(action.payload);
        localStorage.setItem('token', action.payload);
      } else {
        state.user = null;
      }
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    setCheckTokenLoading: (state, action) => {
      state.checkTokenLoading = action.payload;
    },
  },
});

export const { setToken, logout, setCheckTokenLoading } = userSlice.actions;

export default userSlice.reducer;