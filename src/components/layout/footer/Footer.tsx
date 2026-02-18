import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import Images from "../../constants/Images";

const Footer = () => {
  return (
    <footer className="bg-[#031F22] text-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              to="/"
              // onClick={closeMenu}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center shadow-sm">
                <img src={Images.LogoImg} className="rounded-sm" />
              </div>
            </Link>
            {/* <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#e5383b] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">IREMS</span>
            </Link> */}
            <p className="text-sm text-[#ced4da] leading-relaxed">
              Integrated Real Estate Management System. Your complete solution
              for property management, investments, and tenant services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Properties", "About Us", "Contact", "Blog"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-[#ced4da] hover:text-[#e5383b] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {[
                "Property Sales",
                "Rentals",
                "Property Management",
                "Investment Advisory",
              ].map((item) => (
                <li key={item}>
                  <span className="text-sm text-[#ced4da]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-[#ced4da]">
                <MapPin className="w-4 h-4 text-[#e5383b]" />4 Dada Fayemi
                Close, Osapa London, Lekki, Lagos
              </li>
              <li className="flex items-center gap-3 text-sm text-[#ced4da]">
                <Phone className="w-4 h-4 text-[#e5383b]" />
                +234 8140458563
              </li>
              <li className="flex items-center gap-3 text-sm text-[#ced4da]">
                <Mail className="w-4 h-4 text-[#e5383b]" />
                facilities@jordanbrookeestates.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">
            © 2026 Shawtechglobal. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-sm text-white/60 hover:text-[#e5383b] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-sm text-white/60 hover:text-[#e5383b] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
