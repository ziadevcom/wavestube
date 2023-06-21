import { useNavigate } from "react-router-dom";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";
import { useState } from "react";

export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (!searchInput) return;
    navigate(`/search?q=${searchInput}`);
  }

  function handleSearchInputChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <div className="w-full md:max-w-[500px] flex-grow relative text-sm md:text-base">
      <form
        onSubmit={handleSubmit}
        action="/search"
        className="w-full flex items-center rounded-t-sm overflow-hidden h-10 md:h-12 "
      >
        <label htmlFor="searchSongs" className="sr-only">
          Search Songs
        </label>
        <input
          id="searchSongs"
          type="text"
          name="q"
          className="xsm:flex-grow h-full text-text-dark px-4 placeholder-text-red-500"
          placeholder="Search for a song..."
          value={searchInput}
          onChange={handleSearchInputChange}
        ></input>

        <button
          type="submit"
          className="bg-primary-light text-text-light h-full bg-accent hover:bg-accent-light min-w-max"
        >
          <img src="/search.png" className="h-full w-full p-2" alt="" />
          <span className="sr-only">Search</span>
        </button>
      </form>
      <SearchSuggestions searchQuery={searchInput} />
    </div>
  );
}
