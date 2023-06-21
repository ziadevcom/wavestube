import { useNavigate } from "react-router-dom";
import { useState, useCallback, useRef } from "react";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";
import { debounce } from "../../../Utils/helpers";
import { fetchSuggestions } from "../../../Utils/youtube";

export default function Search() {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const debounceFetch = useCallback(debounce(fetchSuggestions, 250), []);
  const searchInputRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const searchInput = searchInputRef.current.value;
    if (!searchInput) return;
    navigate(`/search?q=${searchInput}`);
  }

  function handleSearchInputChange(e) {
    debounceFetch(e.target.value, setSuggestions, setError);
  }

  function handleSuggestionClick(text) {
    searchInputRef.current.value = text;
  }

  function closeSuggestions() {
    setSuggestions([]);
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
          ref={searchInputRef}
          id="searchSongs"
          type="text"
          name="q"
          className="xsm:flex-grow h-full text-text-dark px-4 placeholder-text-red-500"
          placeholder="Search for a song..."
          // value={searchInput}
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
      <SearchSuggestions
        suggestions={suggestions}
        error={error}
        handleSuggestionClick={handleSuggestionClick}
        closeSuggestions={closeSuggestions}
      />
    </div>
  );
}
