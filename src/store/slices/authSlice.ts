import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  id: number;
  email: string;
  role: "admin" | "user";
}

interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("authToken"),
  error: null,
};

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await Request.post<{ user: User; accessToken: string }>(
        API_ENDPOINTS.LOGIN,
        credentials
      );
      const { user, accessToken } = response;

      localStorage.setItem("authToken", accessToken);
      return { user, token: accessToken };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Đăng nhập thất bại"
      );
    }
  }
);

// Check auth
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token");
      return token;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      localStorage.removeItem("authToken");
      console.error("Token không hợp lệ:", error);
      return rejectWithValue("Token không hợp lệ");
    }
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("authToken");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Check auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.token = null;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.token;
export const selectIsAdmin = (state: { auth: AuthState }) =>
  state.auth.user?.role === "admin";
export const selectError = (state: { auth: AuthState }) => state.auth.error;
