import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

function ModalComponent({ isOpen, onClose }) {
  const [wishlistMovieIds, setWishlistMovieIds] = useState([]);
  const [wishlistMovies, setWishlistMovies] = useState([]);

  // Retrieve user info from local storage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo?.id;
  const userEmail = userInfo?.email;

  useEffect(() => {
    const fetchWishlistMovieIds = async () => {
      try {
        const response = await axios.get(`/api/wishlist/${userId}`);
        setWishlistMovieIds(response.data);
      } catch (error) {
        console.error("Error fetching wishlist movie IDs:", error);
      }
    };

    if (isOpen && userId) {
      fetchWishlistMovieIds();
    }
  }, [isOpen, userId]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const moviesData = await Promise.all(
          wishlistMovieIds.map(async (movieId) => {
            const response = await axios.get(
              `https://www.omdbapi.com/?i=${movieId}&apikey=3ccad1a`
            );
            return response.data;
          })
        );
        setWishlistMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (wishlistMovieIds.length > 0) {
      fetchMovieDetails();
    }
  }, [wishlistMovieIds]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/"; // Redirect to home page
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ mt: "120px" }}>
        <ModalHeader>Wishlist Movies</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {userEmail && (
            <div>
              <p>
                <strong>Email:</strong> {userEmail}
              </p>
              <hr />
            </div>
          )}
          {wishlistMovies.map((movie) => (
            <div key={movie.imdbID} style={{ marginBottom: "10px" }}>
              <img
                src={movie.Poster}
                alt={movie.Title}
                style={{ width: "100px", marginRight: "10px" }}
              />
              <p>{movie.Title}</p>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;
