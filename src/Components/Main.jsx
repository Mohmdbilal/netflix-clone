import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "../Requests";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  // Show login popup only if user NOT logged in
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setShowLoginPopup(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowLoginPopup(false);
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(requests.requestPopular)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("API error:", error);
      });
  }, []);

  const movie =
    movies.length > 0
      ? movies[Math.floor(Math.random() * movies.length)]
      : null;

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  // Fetch trailer from TMDB
  const fetchTrailer = async (movieId) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=en-US`
      );
      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        alert("Trailer not available");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  // Save to Watch Later & go to Account page
  const saveToWatchLater = async () => {
    if (user?.email) {
      const movieID = doc(db, "users", `${user?.email}`);
      await updateDoc(movieID, {
        watchLater: arrayUnion({
          id: movie.id,
          title: movie.title || movie.name,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
      navigate("/login");
    }
  };

  // Close login popup handler
  const closePopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <>
      {/* MAIN CONTENT */}
      <div
        className={`w-full h-[550px] text-white relative ${
          showLoginPopup ? "pointer-events-none select-none" : ""
        }`}
      >
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          <div className="absolute w-full h-[200px] bg-gradient-to-b from-black/90"></div>

          {movie && (
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
              alt={movie?.title}
            />
          )}

          <div className="absolute w-full top-[20%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
            <div className="my-4">
              <button
                onClick={() => fetchTrailer(movie.id)}
                className="text-sm md:text-md rounded-sm bg-gray-300 text-black border border-gray-300 py-2 px-5"
              >
                Play
              </button>
              <button
                onClick={saveToWatchLater}
                className="text-sm md:text-md border rounded-sm text-white border-gray-300 hover:bg-gray-100/20 py-2 px-5 ml-4"
              >
                Watch Later
              </button>
            </div>
            <p className="text-gray-400 text-sm md:text-md">
              Released: {movie?.release_date}
            </p>
            <p className="w-full md:max-w-[50%] xl:max-w-[35%] text-gray-200">
              {truncateString(movie?.overview, 150)}
            </p>
          </div>
        </div>
      </div>

      {/* LOGIN POPUP MODAL */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative w-[300px] h-[200px] bg-black bg-opacity-80 rounded-md p-6 flex flex-col justify-between">
            {/* Close icon top-right */}
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-white text-3xl hover:text-red-600"
              aria-label="Close login popup"
            >
              <HiOutlineXMark />
            </button>

            {/* Message */}
            <p className="text-white text-center text-lg mt-8">
              Please login to continue using the site.
            </p>

            {/* Get Started button */}
            <Link
              to="/login"
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 text-center rounded cursor-pointer"
              onClick={() => setShowLoginPopup(false)}
            >
              Get started &gt;
            </Link>
          </div>
        </div>
      )}

      {/* Trailer popup */}
      {trailerUrl && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-[90%] md:w-[70%] h-[70%]">
            <iframe
              className="w-full h-full"
              src={trailerUrl}
              title="Movie Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setTrailerUrl("")}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
