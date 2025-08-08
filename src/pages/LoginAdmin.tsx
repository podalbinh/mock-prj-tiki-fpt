import AdminLoginForm from "@/components/forms/AdminLoginForm";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already authenticated, redirect to admin dashboard
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <div></div>;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default LoginAdmin;
