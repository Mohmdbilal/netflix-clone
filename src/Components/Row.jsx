import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const Row = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(fetchURL);
        setMovies(res.data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [fetchURL]);

  const slideLeft = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft -= 500;
  };

  const slideRight = () => {
    const slider = document.getElementById("slider" + rowID);
    slider.scrollLeft += 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-2xl p-4">{title}</h2>
      <div className="relative group">
        <GoChevronLeft
          onClick={slideLeft}
          className="bg-white text-black rounded-full absolute left-0 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={30}
        />
        <div
          id={"slider" + rowID}
          className="w-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies.map((item) => (
            <Movie key={item.id} item={item} />
          ))}
        </div>
        <GoChevronRight
          onClick={slideRight}
          className="bg-white text-black rounded-full absolute right-0 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={30}
        />
      </div>
    </>
  );
};

export default Row;
