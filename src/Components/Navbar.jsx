import React from "react";
import netflixLogo from "../assets/logo/netflix.png";
import { Link, useNavigate, useLocation } from "react-router-dom"; // added useLocation
import { useAuth } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // get current route

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 pt-0 w-full absolute z-50">
      <Link to="/">
        <img
          src={netflixLogo}
          alt="Netflix Logo"
          className="w-[100px] md:w-[130px] h-auto cursor-pointer"
        />
      </Link>

      {user ? (
        <div className="flex items-center gap-4">
          <Link to="/account">
            <FaUserCircle className="text-white text-2xl cursor-pointer" />
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm md:text-md bg-red-600 px-6 py-2 rounded-sm cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          {/* Hide Sign In when already on /login */}
           {!["/login", "/signup"].includes(location.pathname) && (
            <Link to="/login">
              <button className="text-sm md:text-md text-white pr-4">Sign In</button>
            </Link>
          )}
           {!["/login", "/signup"].includes(location.pathname) && (
          <Link to="/signup">
            <button className="text-sm md:text-md bg-red-600 px-6 py-2 rounded-sm cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
