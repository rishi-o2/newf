import React, { useState, useContext } from "react";
import { SearchContext } from "../Context/usecontext"; // Adjust the import path as necessary
import "./Search.css";

const Search = () => {
  const { setSearchQuery } = useContext(SearchContext);
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={searchInput}
        onChange={handleInputChange}
      />
      <ion-icon name="search-outline" onClick={handleSearch}></ion-icon>
    </div>
  );
};

export default Search;
