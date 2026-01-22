import { useState } from "react";
import Images from "../../../components/constants/Images";
import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const EnterCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const updated = [...code];
    updated[index] = value;
    setCode(updated);

    if (value && index < 5) {
      const nextInput = document.getElementById(
        `code-${index + 1}`
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

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
      <div className="relative z-10 w-full max-w-md bg-[#f5f5f5] rounded-2xl p-8 shadow-elevated animate-scale-in">
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#e5383b]/10 mx-auto mb-4">
          <ShieldCheck className="text-[#e5383b]" size={28} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-[#031F22] mb-2">
          Enter Verification Code
        </h2>

        {/* Description */}
        <p className="text-sm text-center text-gray-600 mb-6">
          We’ve sent a 6-digit verification code to your email.
          Please enter it below to continue.
        </p>

        {/* Code Inputs */}
        <div className="flex justify-between gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-lg font-semibold rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e5383b]"
            />
          ))}
        </div>

        {/* Verify Button */}
       <Link to={"/reset-password"}>
       <button
          type="button"
          className="w-full h-12 rounded-xl bg-[#e5383b] text-white font-medium tracking-wide hover:bg-accent/90 transition"
        >
          Verify Code
        </button>
       </Link>

        {/* Resend */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Didn’t receive the code?{" "}
         <Link to={"/"}>
         <button className="text-[#e5383b] font-medium hover:underline">
            Resend
          </button>
         </Link>
        </p>

        {/* Back */}
        <p className="text-sm text-center text-gray-600 mt-4">
          <Link to="/login" className="hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default EnterCode;
