import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await authService.login(credentials);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const findAccount = createAsyncThunk(
  'auth/findAccount',
  async (email, { rejectWithValue }) => {
    try {
      const data = await authService.findAccount(email);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ userId, password }, { rejectWithValue }) => {
    try {
      const data = await authService.resetPassword(userId, password);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async ({ token }, thunkAPI) => {
    try {
      const response = await authService.googleLogin(token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const sendVerificationEmail = createAsyncThunk(
  '/auth/sendVerificationEmail',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authService.sendVerificationEmail(email);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmail(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null,
  foundAccount: null,
  emailVerified: false,
  verificationEmailSent: false,
  verificationError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.foundAccount = null;
      authService.logout();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(findAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.foundAccount = action.payload;
      })
      .addCase(findAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.foundAccount = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.foundAccount = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendVerificationEmail.pending, (state) => {
        state.loading = true;
        state.verificationEmailSent = null;
      })
      .addCase(sendVerificationEmail.fulfilled, (state) => {
        state.loading = false;
        state.verificationEmailSent = true;
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.loading = false;
        state.verificationError = action.payload;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.emailVerified = true;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
