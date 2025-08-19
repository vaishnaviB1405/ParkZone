import React, { useState } from "react";

function SearchBox({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="container d-flex justify-content-center my-3">
      <div className="input-group w-50">
        <input
          type="text"
          placeholder="Search for parking spaces..."
          value={query}
          onChange={handleInputChange}
          className="form-control"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBox;
