import React, { useState, useEffect, useContext } from "react";
import { SearchContext } from "../Context/usecontext";
import "./Banner.css";
import ModalComponent from "../components/modal";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from "../images/def.png"; // Import default image

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [detailedMovie, setDetailedMovie] = useState(null);
  const { searchQuery } = useContext(SearchContext);
  const toast = useToast();
  console.log(searchQuery);
  const OMDB_API_KEY = "3ccad1a";

  const fetchdata = () => {
    fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${OMDB_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Search && data.Search.length > 0) {
          setMovie(data.Search[0]);
        } else {
          setMovie(null); // Set movie to null if no search results
        }
      })
      .catch((e) => console.log(e.message));
  };

  const fetchDetailedMovieData = (imdbID) => {
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${OMDB_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setDetailedMovie(data);
      })
      .catch((e) => console.log(e.message));
  };

  const toggleDetailedMovie = () => {
    if (detailedMovie) {
      setDetailedMovie(null);
    } else {
      fetchDetailedMovieData(movie.imdbID);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [searchQuery]);

  const addToWishlist = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const response = await axios.post("/api/wishlist/add", {
        userId: userInfo.id,
        movieId: movie.imdbID,
      });
      toast({
        title: "Movie added to wishlist",
        status: "success",
      });
    } catch (error) {
      toast({
        title: "Movie already added",
        status: "warning",
      });
    }
  };

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${movie ? movie.Poster : defaultImage})` }}
    >
      <div className="movie">
        {movie && (
          <img src={movie.Poster} alt={movie.Title} className="bgImg active" />
        )}

        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="content active">
                {movie ? (
                  <>
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="movie-title"
                    />
                    <h4>
                      <span>{movie.Year}</span>
                      
                      <span> {movie.Title}</span>
                    </h4>
                    <p>{movie.Plot}</p>
                    <button className="button" onClick={addToWishlist}>
                      Add to Wishlist
                    </button>
                    <div className="button" onClick={toggleDetailedMovie}>
                      {detailedMovie ? "Hide Details" : "Show Details"}
                    </div>
                  </>
                ) : (
                  <p>No movie selected</p>
                )}
              </div>
            </div>

            <div className="col-lg-6 col-md-12"></div>
          </div>
        </div>
      </div>

      {detailedMovie && (
        <div className="movie-details active">
          <h2>{detailedMovie.Title}</h2>
          <p>
            <strong>Director:</strong> {detailedMovie.Director}
          </p>
          <p>
            <strong>Actors:</strong> {detailedMovie.Actors}
          </p>
          <p>
            <strong>Plot:</strong> {detailedMovie.Plot}
          </p>
          <p>
            <strong>Genre:</strong> {detailedMovie.Genre}
          </p>
          <p>
            <strong>Released:</strong> {detailedMovie.Released}
          </p>
          <p>
            <strong>Runtime:</strong> {detailedMovie.Runtime}
          </p>
          <p>
            <strong>IMDB Rating:</strong> {detailedMovie.imdbRating}
          </p>
          <p>
            <strong>Box Office:</strong> {detailedMovie.BoxOffice}
          </p>
        </div>
      )}
    </div>
  );
};

export default Banner;
