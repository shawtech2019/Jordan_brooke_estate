import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { RiCloseFill } from "react-icons/ri";
import Images from "../constants/Images";

const Header = () => {
  const [open, setOpen] = useState(false);

  const activeLink =
    "border-b-4 px-[2px] mr-[4px] font-bold border-[#B62931] text-[#071c48] text-[14px]";
  const normalLink =
    "text-[#031F22] hover:text-[#B62931] transition-colors";

  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f2f2f2] backdrop-blur-md border-b border-[#e3e8ef]">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-md flex items-center justify-center shadow-sm">
            <img src={Images.LogoImg} className=""/>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <div
          className="text-2xl md:hidden cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <RiCloseFill /> : <HiOutlineBars3BottomRight />}
        </div>

        {/* Navigation */}
        <ul
          className={`md:flex md:items-center md:static absolute left-0 w-full md:w-auto
          bg-[#f2f2f2] md:bg-transparent transition-all duration-500 ease-in
          md:top-0 px-6 md:px-0 pb-6 md:pb-0 z-[-1] md:z-auto
          ${open ? "top-16" : "top-[-500px]"}`}
        >
          {[
            { name: "Home", path: "/" },
            { name: "Properties", path: "/properties" },
            { name: "About", path: "/about" },
            // { name: "Team", path: "/team" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <li key={item.name} className="md:ml-8 text-[14px] font-display my-4 md:my-0">
              <NavLink
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          {/* Mobile Buttons */}
          <li className="md:hidden mt-6 space-y-3">
            <Link to="/login" onClick={closeMenu}>
              <button className="w-full border border-[#B62931] text-[#031F22] hover:bg-[#B62931] hover:text-white px-4 py-2 rounded-md font-medium transition-colors">
                Login
              </button>
            </Link>

            {/* <Link to="/contact" onClick={closeMenu}>
              <button className="w-full bg-[#071c48] hover:bg-[#3a4a73] text-[#fafafa] px-4 py-2 rounded-md font-medium transition-colors shadow-sm">
                Get Started
              </button>
            </Link> */}
          </li>
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <button className="border border-[#B62931] text-[#031F22] hover:bg-[#B62931] hover:text-white px-4 py-2 rounded-md font-medium transition-colors">
              Login
            </button>
          </Link>

          {/* <Link to="/contact">
            <button className="bg-[#071c48] hover:bg-[#3a4a73] text-[#fafafa] px-4 py-2 rounded-md font-medium transition-colors shadow-sm">
              Get Started
            </button>
          </Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
