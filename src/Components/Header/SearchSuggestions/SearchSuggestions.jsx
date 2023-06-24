import { PropTypes } from "prop-types";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchSuggestions({
  suggestions,
  error,
  handleSuggestionClick,
  closeSuggestions,
}) {
  useEffect(() => {
    document.body.addEventListener("click", closeSuggestions);
    return () => {
      document.body.removeEventListener("click", closeSuggestions);
    };
  }, []);

  return (
    <div className="w-full md:w-[500px] pt-2 bg-bg-light rounded-b-sm  text-text-dark absolute z-10">
      {error && "Something went wrong. Please try again."}
      {suggestions.map((s, i) => (
        <SuggestionLink
          key={i}
          text={s}
          handleSuggestionClick={handleSuggestionClick}
        />
      ))}
    </div>
  );
}

function SuggestionLink({ text, handleSuggestionClick }) {
  return (
    <Link
      to={"/search?q=" + text}
      className="block py-1 px-3 hover:bg-accent hover:text-text-light focus:bg-accent focus:text-text-light"
      onClick={() => handleSuggestionClick(text)}
    >
      {text}
    </Link>
  );
}

SearchSuggestions.propTypes = {
  suggestions: PropTypes.array,
  error: PropTypes.bool,
  handleSuggestionClick: PropTypes.func,
  closeSuggestions: PropTypes.func,
};

SuggestionLink.propTypes = {
  text: PropTypes.string,
  handleSuggestionClick: PropTypes.func,
};
