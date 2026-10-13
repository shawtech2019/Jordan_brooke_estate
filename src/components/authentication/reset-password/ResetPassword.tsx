import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Images from "../../constants/Images";
import { Lock, Eye, EyeOff } from "lucide-react";
import { httpPostWithoutToken } from "../../utils/api_utils";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { email = "", otp = "" } =
    (location.state as { email?: string; otp?: string } | null) ?? {};

  /* Guard: must arrive from the code step with both email + code. */
  useEffect(() => {
    if (!email || !otp) {
      toast.error("Please restart the password reset.");
      navigate("/forgot-password", { replace: true });
    }
  }, [email, otp, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await httpPostWithoutToken<{ message?: string }>(
        "auth/reset-password",
        { email, otp, password }
      );

      toast.success(response.message || "Password reset successful.");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={Images.HeroSectionImg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#031F22]/95 via-[#031F22]/80 to-[#031F22]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md bg-[#f5f5f5] rounded-2xl p-8 shadow-elevated animate-scale-in">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-[#031F22] mb-2">
          Reset Password
        </h2>

        {/* Description */}
        <p className="text-sm text-center text-gray-600 mb-6">
          Create a new password for your account.
          Make sure it’s strong and secure.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6c757d]" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full h-12 rounded-xl bg-white px-12 pr-12 text-sm shadow focus:outline-none focus:ring-2 focus:ring-[#e5383b]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6c757d] hover:text-[#031F22]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6c757d]" />
            <input
              type={showConfirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full h-12 rounded-xl bg-white px-12 pr-12 text-sm shadow focus:outline-none focus:ring-2 focus:ring-[#e5383b]"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6c757d] hover:text-[#031F22]"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#e5383b] text-white font-medium tracking-wide hover:bg-accent/90 transition disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* Back to Login */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-[#e5383b] font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;