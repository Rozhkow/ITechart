import React from "react";

function Search({ setSearchTerm }) {
  return (
    <div className="Search">
      <input
        type="text"
        placeholder="Search.."
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
    </div>
  );
}

export default Search;
