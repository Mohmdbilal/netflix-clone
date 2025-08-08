import React from "react";
import { useAuth } from "../context/AuthContext"; // adjust path if needed
import { useNavigate } from "react-router-dom";

export default function Account() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Account</h1>

      {/* User Info */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={`https://ui-avatars.com/api/?name=${user?.email}&background=ff0000&color=fff`}
          alt="Profile"
          className="w-16 h-16 rounded-full border border-gray-700"
        />
        <div>
          <p className="text-lg font-semibold">{user?.email}</p>
          <p className="text-sm text-gray-400">
            Member Since:{" "}
            {user?.metadata?.creationTime
              ? new Date(user.metadata.creationTime).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* My List Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">My List</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Placeholder movies - replace with Firestore data */}
          <div className="bg-gray-800 h-40 flex items-center justify-center rounded">
            Movie 1
          </div>
          <div className="bg-gray-800 h-40 flex items-center justify-center rounded">
            Movie 2
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-6 py-2 mt-10 rounded font-semibold"
      >
        Logout
      </button>
    </div>
  );
}
