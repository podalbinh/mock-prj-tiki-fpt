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
} from "@/store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);
  const error = useAppSelector(selectError);

  // Auto check auth on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && !user) {
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
    login: handleLogin,
    logout: handleLogout,
    clearError: clearAuthError,
  };
};

