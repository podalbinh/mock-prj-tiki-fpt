import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  login,
  logout,
  checkAuth,
  clearError,
  selectUser,
  selectIsAuthenticated,
  selectIsAdmin,
  selectError,
  selectIsLoading,
} from "@/store/slices/authSlice";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);
  const error = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoading);
  const navigate = useNavigate();

  // Auto check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/admin/login");
    }
    if (!user) {
      dispatch(checkAuth());
    }
  }, [dispatch, user]);

  const handleLogin = async (email: string, password: string) => {
    const result = await dispatch(login({ email, password }));
    return login.fulfilled.match(result);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    isAdmin,
    error,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
    clearError: clearAuthError,
  };
};

