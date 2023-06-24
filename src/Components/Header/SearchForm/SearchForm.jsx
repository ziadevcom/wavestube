import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useCallback, useRef } from "react";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";
import { debounce } from "../../../Utils/helpers";
import { fetchSuggestions } from "../../../Utils/youtube";
import { REQUEST_DEBOUNCE_TIME } from "../../../Utils/constants";

export default function Search() {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);
  const debounceFetch = useCallback(
    debounce(fetchSuggestions, REQUEST_DEBOUNCE_TIME),
    []
  );
  const [showSuggestions, setShowSuggestions] = useState(null);

  const searchInputRef = useRef(null);
  const [params] = useSearchParams();
  const query = params.get("q");

  function handleSubmit(event) {
    event.preventDefault();
    setShowSuggestions(false);
    const searchInput = searchInputRef.current.value;
    if (!searchInput) return;
    navigate(`/search?q=${searchInput}`);
  }

  function handleSearchInputChange(e) {
    setShowSuggestions(true);
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
          defaultValue={query}
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
      {suggestions.length > 1 && showSuggestions && (
        <SearchSuggestions
          suggestions={suggestions}
          error={error}
          handleSuggestionClick={handleSuggestionClick}
          closeSuggestions={closeSuggestions}
        />
      )}
    </div>
  );
}
