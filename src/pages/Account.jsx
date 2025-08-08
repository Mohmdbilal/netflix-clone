import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { HiMiniXMark } from "react-icons/hi2";

export default function Account() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  // Fetch favorites & watch later in real-time
  useEffect(() => {
    if (!user?.email) return;
    const docRef = doc(db, "users", user.email);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setFavorites(docSnap.data()?.savedShows || []);
        setWatchLater(docSnap.data()?.watchLater || []);
      }
    });

    return () => unsubscribe();
  }, [user?.email]);

  // Remove movie from My List
  const removeFavorite = async (movieId) => {
    try {
      const updatedList = favorites.filter((item) => item.id !== movieId);
      const movieRef = doc(db, "users", user.email);
      await updateDoc(movieRef, { savedShows: updatedList });
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  // Remove movie from Watch Later
  const removeWatchLater = async (movieId) => {
    try {
      const updatedList = watchLater.filter((item) => item.id !== movieId);
      const movieRef = doc(db, "users", user.email);
      await updateDoc(movieRef, { watchLater: updatedList });
    } catch (err) {
      console.error("Error removing from Watch Later:", err);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Reusable movie card
  const MovieGrid = ({ movies, removeFn, icon, removeColor }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="relative group rounded overflow-hidden"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.img}`}
            alt={movie.title}
            className="w-full h-40 object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition-opacity">
            <p className="text-sm text-center font-semibold px-2">
              {movie.title}
            </p>
            {/* Remove Button */}
            <button
              onClick={() => removeFn(movie.id)}
              className={`${removeColor} hover:scale-110 transition-transform`}
            >
              {icon}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-black text-white px-8 py-10">
      <div className="mt-28">
        <h1 className="text-5xl font-bold py-12 mb-8">My Shows</h1>

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
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">My List </h2>
          {favorites.length === 0 ? (
            <p className="text-gray-400">No saved movies yet.</p>
          ) : (
            <MovieGrid
              movies={favorites}
              removeFn={removeFavorite}
              icon={<HiMiniXMark size={20} />}
              removeColor="text-red-500"
            />
          )}
        </div>

        {/* Watch Later Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Watch Later </h2>
          {watchLater.length === 0 ? (
            <p className="text-gray-400">No movies in Watch Later.</p>
          ) : (
            <MovieGrid
              movies={watchLater}
              removeFn={removeWatchLater}
              icon={<HiMiniXMark size={20} />}
              removeColor="text-yellow-400"
            />
          )}
        </div>

        
      </div>
    </div>
  );
}
