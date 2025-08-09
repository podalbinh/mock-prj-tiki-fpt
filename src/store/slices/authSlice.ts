import Request from "@/config/api";
import { API_ENDPOINTS } from "@/constant/endpoint";
import { UserRole } from "@/constant/enums";
import type { User } from "@/constant/interfaces";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("authToken"),
  error: null,
  isLoading: true,
};

// Login
export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await Request.post<{ user: User; token: string }>(
        API_ENDPOINTS.LOGIN,
        credentials
      );
      const { user, token } = response;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { user, token };
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
      const user = await Request.get<User>(API_ENDPOINTS.ME);
      if (!user) throw new Error("No user data");
      return user;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      console.error("Token không hợp lệ:", error);
      return rejectWithValue("Token không hợp lệ");
    }
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
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
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.isLoading = false;
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
  state.auth.user?.role === UserRole.ADMIN;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectIsLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
