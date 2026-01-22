import { Mail, Lock, User, EyeOff, Eye } from "lucide-react";
import Images from "../../../components/constants/Images";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
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

          {/* RIGHT — Register Form */}
          <div className="bg-[#f5f5f5] rounded-2xl p-8 shadow-elevated animate-scale-in">
            <h2 className="text-2xl font-semibold text-[#031F22] mb-6">
              Create Account
            </h2>

            <form className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6c757d]" />
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full h-12 rounded-xl bg-white px-12 text-sm shadow focus:outline-none focus:ring-2 focus:ring-[#e5383b]"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6c757d]" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full h-12 rounded-xl bg-white px-12 text-sm shadow focus:outline-none focus:ring-2 focus:ring-[#e5383b]"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6c757d]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full h-12 rounded-xl bg-white px-12 text-sm shadow focus:outline-none focus:ring-2 focus:ring-[#e5383b]"
                />
                 <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute  right-4 top-1/2 -translate-y-1/2 text-[#6c757d]">
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6c757d]" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="w-full h-12 rounded-xl bg-white px-12 text-sm shadow focus:outline-none focus:ring-2 focus:ring-[#e5383b]"
                />
                <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute  right-4 top-1/2 -translate-y-1/2 text-[#6c757d]">
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#e5383b] text-white font-medium tracking-wide hover:bg-accent/90 transition"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="text-sm text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Social Signup */}
            <div className="space-y-3">
              {/* Google */}
              <button
                type="button"
                className="w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <img
                  src={Images.GoogleLogoImg}
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>

              {/* Apple */}
              <button
                type="button"
                className="w-full h-12 flex items-center justify-center gap-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-black/90 transition"
              >
                <img
                  src={Images.AppleLogoImg}
                  alt="Apple"
                  className="w-5 h-5 invert"
                />
                Sign up with Apple
              </button>
            </div>

            {/* Footer */}
            <p className="text-sm text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link to={"/login"}>
              <span className="text-[#e5383b] font-medium cursor-pointer">
                Log in
              </span>
              </Link>
            </p>
          </div>
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[#B62931] border-[1.5px] border-[##B62931]/80  mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#B62931] animate-pulse" />
              <span className="text-sm font-medium">
                Your Comfort, Our Priority
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-display font-bold text-[#f5f5f5] leading-tight mb-6 animate-slide-up">
              Our Happiness Is When
              <span className="block text-[#e5383b]">
                You Are Comfortable
              </span>
            </h1>

            {/* Paragraph */}
            <p className="text-lg text-[#ced4da] tracking-[0.5px] max-w-xl mb-8 animate-slide-up delay-100">
              Efficient management of your real estate and your property,
              designed to give you peace of mind and complete control.
            </p>

            {/* CTA Button */}
            <button
              type="button"
              className="flex items-center justify-center px-8 h-12 gap-2 rounded-xl bg-[#e5383b] text-white font-medium tracking-wide hover:bg-accent/90 transition animate-slide-up delay-200"
            >
              Get Started
              <IoIosArrowRoundForward color={"#ffffff"} size={25} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
