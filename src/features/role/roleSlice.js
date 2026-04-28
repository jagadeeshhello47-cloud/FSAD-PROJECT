import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// API base URL - update this to match your backend URL
const API_BASE_URL = 'http://localhost:8080/api';

// Async thunks for backend API
export const loginUser = createAsyncThunk(
  'role/loginUser',
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        userName,
        password,
      });
      
      if (response.data.success) {
        return response.data.user;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUserAsync = createAsyncThunk(
  'role/registerUser',
  async ({ userName, password, role }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        userName,
        password,
        role,
      });
      
      if (response.data.success) {
        return response.data.user;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

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
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.userName = action.payload.userName;
        state.currentRole = action.payload.role;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Register user
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const getIsAuthenticated = (store) => store.role.isAuthenticated;

export const getCurrentUserName = (store) => store.role.userName;

export const getCurrentRole = (store) => store.role.currentRole;

export const getRegisteredUsers = (store) => store.role.users;

export const getRoleHomePath = (store) => roleRouteMap[store.role.currentRole] || '/investor';

export const getRoleStatus = (store) => store.role.status;

export const getRoleError = (store) => store.role.error;

export const {
  loginWithRole,
  registerUser,
  loginWithCredentials,
  logout,
  setCurrentRole,
  hydrateRoleState,
  clearError,
} = roleSlice.actions;

export default roleSlice.reducer;
