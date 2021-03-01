import React from "react";

function Search({ handleSearch }) {
  return (
    <div className="flex justify-end w-1/4">
      <div className="relative w-full">
        <input
          onChange={(e) => handleSearch(e)}
          className="w-full py-2 pl-2 pr-5 border border-black focus:outline-none"
          placeholder="Search contact name"
        />
        <div className="absolute inset-x-auto inset-y-3">
          <i
            className="absolute pl-6 text-blue-400 fill-current fa fa-search inset-x-64"
            aria-hidden="true"
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Search;
