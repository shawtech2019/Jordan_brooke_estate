import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { httpPostWithoutToken, validateEmail } from "../../utils/api_utils";
import { toast, ToastContainer } from "react-toastify";
import Images from "../../constants/Images";

interface ApiResponse {
  status: "success" | "error";
  message?: string;
  token?: string;
  requiresRoleSelection?: boolean;
}

const OTP_LENGTH = 6;
const RESEND_DELAY = 30;

/**
 * Second step of a two-factor login. Reached after `auth/login` reports
 * `requires2FA`; the server has already emailed a one-time code.
 */
const TwoFactorAuth: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(RESEND_DELAY);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  /* Extract email */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const rawEmail = params.get("u");
    const userEmail = rawEmail ? decodeURIComponent(rawEmail) : null;

    if (!userEmail || !validateEmail(userEmail)) {
      toast.error("Invalid verification link");
      navigate("/login");
      return;
    }

    setEmail(userEmail);
  }, [location.search, navigate]);

  /* Countdown timer */
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
    setResendDisabled(false);
  }, [counter]);

  /* OTP handlers */
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pasted)) return;

    const newOtp = pasted.split("");
    setOtp([...newOtp, ...Array(OTP_LENGTH - newOtp.length).fill("")]);
  };

  /* Verify the login code and start the session */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const code = otp.join("");

    if (code.length !== OTP_LENGTH) {
      toast.warning("Please enter the full 6-digit code");
      return;
    }

    try {
      setLoading(true);

      const response = await httpPostWithoutToken<ApiResponse>(
        "auth/verify-login-otp",
        { email, otp: code }
      );

      if (response.status === "success" && response.token) {
        localStorage.setItem("token", response.token);
        toast.success("Login successful");
        setSubmitted(true);

        setTimeout(
          () =>
            navigate(
              response.requiresRoleSelection ? "/select-role" : "/start-dashboard"
            ),
          1500
        );
      } else {
        toast.error(response.message ?? "Verification failed");
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Server error");
    } finally {
      setLoading(false);
    }
  };

  /* Resend the login code */
  const resendCode = async (): Promise<void> => {
    if (resendDisabled) return;

    try {
      const response = await httpPostWithoutToken<ApiResponse>(
        "auth/resend-login-otp",
        { email }
      );

      if (response.status === "success") {
        toast.success(response.message ?? "New code sent");
        setCounter(RESEND_DELAY);
        setResendDisabled(true);
      } else {
        toast.error(response.message ?? "Failed to resend code");
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Server error");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={Images.HeroSectionImg}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#031F22]/95 via-[#031F22]/85 to-[#031F22]/70" />
      </div>

      {/* Card */}
      <div className="w-full max-w-6xl bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row">
        {/* LEFT */}
        <div className="w-full lg:w-1/2 px-6 sm:px-10 py-12 flex flex-col justify-center">
          {submitted ? (
            <div className="text-center space-y-4 animate-fadeIn">
              <h2 className="text-3xl font-bold text-[#e5383b]">
                Verified 🎉
              </h2>
              <p className="text-gray-600 text-sm">
                Signing you in...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Two-Factor Authentication
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Enter the 6-digit code sent to
                  <br />
                  <span className="font-semibold text-gray-800 break-all">
                    {email}
                  </span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center lg:justify-start gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputsRef.current[index] = el;
                      }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      inputMode="numeric"
                      autoFocus={index === 0}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-semibold 
                      border border-gray-300 rounded-xl shadow-sm 
                      focus:outline-none focus:ring-2 focus:ring-[#e5383b] focus:border-transparent
                      transition-all duration-200 hover:border-gray-400"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#ee009d] to-[#e5383b] 
                  text-white font-semibold py-3 rounded-xl shadow-md
                  hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
                  transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify & Sign In"}
                </button>
              </form>

              <div className="mt-6 text-sm text-center lg:text-left text-gray-600">
                {resendDisabled ? (
                  <p>
                    Resend available in{" "}
                    <span className="font-semibold text-[#e5383b]">
                      {counter}s
                    </span>
                  </p>
                ) : (
                  <button
                    onClick={resendCode}
                    className="text-[#2aa100] font-semibold hover:underline"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* RIGHT */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#ee009d] to-[#e5383b] items-center justify-center p-12">
          <div className="text-center text-white max-w-sm space-y-4">
            <h3 className="text-2xl font-bold">Two-Step Security</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              We&apos;ve emailed a secure one-time code to your address. Enter it
              here to finish signing in safely.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoFactorAuth;
