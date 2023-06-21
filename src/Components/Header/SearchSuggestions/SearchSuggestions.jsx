import { PropTypes } from "prop-types";
import { useRef } from "react";
import { getInstanceURL } from "../../../Utils/helpers";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchSuggestions({ searchQuery }) {
  const controllerRef = useRef(new AbortController());
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(false);

  async function fetchSuggestions() {
    if (!searchQuery) return;
    try {
      controllerRef.current = new AbortController();
      const instanceURL = await getInstanceURL();
      const response = await fetch(
        `${instanceURL}/suggestions?query=${searchQuery}`,
        { signal: controllerRef.current.signal }
      );

      const suggestions = await response.json();

      setSuggestions(suggestions);
      setError(false);
    } catch (e) {
      console.log(e);
      if (!(e instanceof DOMException)) {
        setError(true);
      }
    }
  }

  function closeSuggestions() {
    setSuggestions([]);
  }

  useEffect(() => {
    document.body.addEventListener("click", closeSuggestions);
    return () => {
      document.body.removeEventListener("click", closeSuggestions);
    };
  }, []);

  useEffect(() => {
    controllerRef.current.abort(); // cancel previous request
    fetchSuggestions();
  }, [searchQuery]);

  return (
    suggestions.length > 1 && (
      <div className="w-full md:w-[500px] pt-2 bg-bg-light rounded-b-sm  text-text-dark absolute">
        {error && "Something went wrong. Please try again."}
        {suggestions.map((s, i) => (
          <SuggestionLink
            key={i}
            text={s}
            closeSuggestions={closeSuggestions}
          />
        ))}
      </div>
    )
  );
}

SearchSuggestions.propTypes = {
  searchQuery: PropTypes.string,
};

function SuggestionLink({ text, closeSuggestions }) {
  return (
    <Link
      to={"/search?q=" + text}
      className="block py-1 px-3 hover:bg-accent hover:text-text-light focus:bg-accent focus:text-text-light"
      onClick={closeSuggestions}
    >
      {text}
    </Link>
  );
}

SuggestionLink.propTypes = {
  text: PropTypes.string,
  closeSuggestions: PropTypes.func,
};
