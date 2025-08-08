import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import YouTube from "react-youtube";

// Modal for trailer
const TrailerModal = ({ videoKey, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black p-4 rounded-lg relative w-[90%] md:w-[800px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl"
        >
          ✖
        </button>
        {videoKey ? (
          <YouTube
            videoId={videoKey}
            opts={{
              width: "100%",
              height: "400",
              playerVars: { autoplay: 1 },
            }}
          />
        ) : (
          <p className="text-white">No trailer available</p>
        )}
      </div>
    </div>
  );
};

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const movieID = doc(db, "users", `${user?.email}`);

  // Save to Favorites
  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title || item.name,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  // Fetch and play trailer
  const fetchTrailer = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&language=en-US`
      );
      const data = await res.json();
      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailerKey(trailer ? trailer.key : null);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <>
      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 group">
        <img
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
          alt={item?.title || item?.name}
        />

        <div className="absolute top-0 left-0 w-full h-full bg-black/80 opacity-0 group-hover:opacity-100 text-white p-2 flex flex-col justify-center items-center">
          {/* Movie Title - Click to Play Trailer */}
          <p
            onClick={fetchTrailer}
            className="whitespace-normal text-xs md:text-sm font-bold text-center  cursor-pointer"
          >
            {item?.title || item?.name}
          </p>

          {/* Favorite Button */}
          <p
            className="absolute top-4 left-4 text-gray-300 cursor-pointer"
            onClick={saveShow}
          >
            {like ? <FaHeart /> : <FaRegHeart />}
          </p>
        </div>
      </div>

      {/* Trailer Modal */}
      {isModalOpen && (
        <TrailerModal
          videoKey={trailerKey}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default Movie;
