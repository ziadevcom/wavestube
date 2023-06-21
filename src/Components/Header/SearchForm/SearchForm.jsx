import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Search() {
  const [params] = useSearchParams();
  const searchInput = useRef();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Perform any necessary form processing here

    // Redirect to the desired page using history.push
    navigate(`/search?q=${searchInput.current.value}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      action="/search"
      className="flex items-center rounded overflow-hidden flex-grow max-w-[500px] h-12"
    >
      <label htmlFor="searchSongs" className="sr-only">
        Search Songs
      </label>
      <input
        ref={searchInput}
        id="searchSongs"
        type="text"
        name="q"
        className="flex-grow h-full text-text-dark px-4 placeholder-text-red-500"
        placeholder="Search for a song..."
        defaultValue={params.get("q")}
      ></input>

      <button
        type="submit"
        className="bg-primary-light text-text-light h-full bg-accent hover:bg-accent-light"
      >
        <img src="/search.png" className="h-full w-full p-2" alt="" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
}
