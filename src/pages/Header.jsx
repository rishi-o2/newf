import React, { useState, useEffect } from "react";
import NavListItem from "../components/NavListItem";
import navListData from "../data/navlistdata";
import "./Header.css";
import Search from "../components/Search";
import ModalComponent from "../components/modal"; // Ensure correct import path

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      setUserInfo(user);
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header-container">
      <a href="/" className="logo">
        Cinema
      </a>
      <ul className="nav">
        {navListData.map((nav) => (
          <NavListItem key={nav._id} nav={nav} />
        ))}
      </ul>
      <div>
        <Search className="Search" />
      </div>
      <button className="your-list-button" onClick={handleOpenModal}>
        Your List
      </button>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userInfo={userInfo}
      />
    </header>
  );
}

export default Header;
