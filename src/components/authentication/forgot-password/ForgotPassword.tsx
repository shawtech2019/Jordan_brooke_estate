import { Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Images from "../../../components/constants/Images";

const ForgotPassword = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      <div className="relative z-10 container-wide pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* LEFT — Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-[#B62931] border border-accent/30 mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#B62931] animate-pulse" />
              <span className="text-sm font-medium">
                Password Recovery
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-[#f5f5f5] leading-tight mb-6 animate-slide-up">
              Forgot Your
              <span className="block text-[#e5383b]">
                Password?
              </span>
            </h1>

            {/* Paragraph */}
            <p className="text-lg text-[#ced4da] tracking-[0.5px] max-w-xl mb-8 animate-slide-up delay-100">
              No worries. Enter your registered email address and we’ll send you
              instructions to reset your password securely.
            </p>

            {/* Back to Login */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-[#ced4da] hover:text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>

          {/* RIGHT — Reset Card */}
          <div className="bg-[#f5f5f5] rounded-2xl p-8 shadow-elevated animate-scale-in">
            <h2 className="text-2xl font-semibold text-[#031F22] mb-6">
              Reset Password
            </h2>

            <form className="space-y-4">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6c757d]" />
                <input
                  type="email"
                  placeholder="Enter your email address or phone number"
                  className="w-full h-12 rounded-xl bg-white px-12 text-sm shadow focus:outline-none focus:ring-2 focus:ring-[#e5383b]"
                />
              </div>

              {/* Submit */}
              <Link to={"/enter-code"}>
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#e5383b] text-white font-medium tracking-wide hover:bg-accent/90 transition"
              >
                Send Reset Code
              </button>
              </Link>
            </form>

            {/* Info */}
            <p className="text-sm text-gray-600 mt-6 text-center">
              You’ll receive a password reset code if the email is registered
              with us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
