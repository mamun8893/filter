import React from "react";
import "./search.css";
import SearchIcon from "@mui/icons-material/Search";

const Searchbar = ({ value, handleChange }) => {
  return (
    <div className="searchbar-warper">
      <div className="searchBar-wrap">
        <SearchIcon className="searchBar-icon" />
        <input
          type="text"
          placeholder="Woodland Hills"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Searchbar;
