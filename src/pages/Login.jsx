import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Netfliximage from "../assets/images/netflix-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import Netflixicon from "../assets/images/netflixicon.png";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { logIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logIn(email, password);
      navigate("/"); // Redirect after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full h-screen">
      <img
        className="sm:block absolute w-full h-full object-cover"
        src={Netfliximage}
        alt="Netflix Background"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>

      <div className="fixed w-full px-2 py-2 z-50">
        <div className="mt-32 max-w-[420px] md:max-w-[450px] bg-black/75 text-white mx-auto rounded-xl">
          <div className="max-w-[320px] mx-auto py-8">
            <img
              className="max-w-[40px] h-[40px] md:max-w-[50px] md:h-[50px]"
              src={Netflixicon}
              alt="netflix"
            />
            <h1 className="text-2xl md:text-3xl font-light p-4 pl-1">
              Sign In
            </h1>

            {error && (
              <p className="bg-red-600 p-2 rounded text-sm mb-3">{error}</p>
            )}

            <form
              className="flex flex-col gap-3 md:gap-4"
              onSubmit={handleSubmit}
            >
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm md:text-md pl-10 pr-3 py-2 rounded-xs bg-gray-700 text-black placeholder-gray outline-none"
                  style={{ caretColor: "white" }}
                />
              </div>

              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-sm md:text-md pl-10 pr-3 py-2 rounded-xs bg-gray-700 text-black placeholder-gray outline-none"
                  style={{ caretColor: "white" }}
                />
              </div>

              <button
                type="submit"
                className="w-full text-sm md:text-md py-2 mt-2 bg-red-600 hover:bg-red-700 rounded-xs text-white font-semibold transition"
              >
                Sign In
              </button>

              <div className="flex justify-between items-center gap-2 mt-1 text-sm">
                <label className="text-sm md:text-md text-gray-300">
                  <input type="checkbox" className="accent-red-600 mr-1" />
                  Remember me
                </label>
                <span className="text-sm md:text-md text-gray-300 cursor-pointer">
                  Need Help?
                </span>
              </div>

              <p className="text-xs text-gray-400 mt-4 px-2 text-center leading-snug">
                New to Netflix?
                <span className="text-white p-1 font-semibold">
                  <Link to="/signup">Sign Up</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
