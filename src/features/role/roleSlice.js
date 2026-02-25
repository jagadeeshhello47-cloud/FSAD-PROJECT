import { createSlice } from '@reduxjs/toolkit';

export const roleRouteMap = {
  Admin: '/admin',
  Investor: '/investor',
  'Financial Advisor': '/advisor',
  'Data Analyst': '/analyst',
};

const initialState = {
  isAuthenticated: false,
  userName: '',
  currentRole: 'Investor',
  users: [],
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    loginWithRole: (state, action) => {
      state.isAuthenticated = true;
      state.userName = action.payload.userName;
      state.currentRole = action.payload.role;
    },
    registerUser: (state, action) => {
      const { userName, password, role } = action.payload;
      if (!userName || !password || !role) return;

      const exists = state.users.some(
        (item) => item.userName.toLowerCase() === userName.toLowerCase()
      );

      if (!exists) {
        state.users.push({ userName, password, role });
      }
    },
    loginWithCredentials: (state, action) => {
      const { userName, password } = action.payload;
      const matchedUser = state.users.find(
        (item) => item.userName.toLowerCase() === userName.toLowerCase() && item.password === password
      );

      if (matchedUser) {
        state.isAuthenticated = true;
        state.userName = matchedUser.userName;
        state.currentRole = matchedUser.role;
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userName = '';
      state.currentRole = 'Investor';
    },
    setCurrentRole: (state, action) => {
      state.currentRole = action.payload;
    },
    hydrateRoleState: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const getIsAuthenticated = (store) => store.role.isAuthenticated;

export const getCurrentUserName = (store) => store.role.userName;

export const getCurrentRole = (store) => store.role.currentRole;

export const getRegisteredUsers = (store) => store.role.users;

export const getRoleHomePath = (store) => roleRouteMap[store.role.currentRole] || '/investor';

export const {
  loginWithRole,
  registerUser,
  loginWithCredentials,
  logout,
  setCurrentRole,
  hydrateRoleState,
} = roleSlice.actions;

export default roleSlice.reducer;
