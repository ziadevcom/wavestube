import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultItem from "./SearchResultItem/SearchResultItem";
import { searchYoutube } from "../../Utils/youtube";

export default function SearchResults() {
  const [params] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const query = params.get("q");

  async function fetchResult() {
    try {
      setSearchResults(await searchYoutube(query));
      setIsLoading(false);
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchResult(query);
    setIsLoading(true);
  }, [query]);

  return (
    <div id="searchResults">
      {error && <p>Something went wrong, please refresh the page</p>}
      {isLoading && <Loader />}
      {!error && !isLoading && (
        <SearchResultsGrid query={query} videos={searchResults.items} />
      )}
    </div>
  );
}

function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 135 140"
        className="fill-accent w-12 h-12"
      >
        <rect y="10" width="10" height="120" rx="6">
          <animate
            attributeName="height"
            begin="0.5s"
            dur="1s"
            values="120;110;100;90;80;70;60;50;40;140;120"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            begin="0.5s"
            dur="1s"
            values="10;15;20;25;30;35;40;45;50;0;10"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="30" y="10" width="10" height="120" rx="6">
          <animate
            attributeName="height"
            begin="0.25s"
            dur="1s"
            values="120;110;100;90;80;70;60;50;40;140;120"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            begin="0.25s"
            dur="1s"
            values="10;15;20;25;30;35;40;45;50;0;10"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="60" width="10" height="140" rx="6">
          <animate
            attributeName="height"
            begin="0s"
            dur="1s"
            values="120;110;100;90;80;70;60;50;40;140;120"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            begin="0s"
            dur="1s"
            values="10;15;20;25;30;35;40;45;50;0;10"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="90" y="10" width="10" height="120" rx="6">
          <animate
            attributeName="height"
            begin="0.25s"
            dur="1s"
            values="120;110;100;90;80;70;60;50;40;140;120"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            begin="0.25s"
            dur="1s"
            values="10;15;20;25;30;35;40;45;50;0;10"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="120" y="10" width="10" height="120" rx="6">
          <animate
            attributeName="height"
            begin="0.5s"
            dur="1s"
            values="120;110;100;90;80;70;60;50;40;140;120"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            begin="0.5s"
            dur="1s"
            values="10;15;20;25;30;35;40;45;50;0;10"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
}

function SearchResultsGrid({ query, videos }) {
  return (
    <>
      <p className="pb-4 md:pb-8 md:text-lg">
        You searched for <strong> {query} </strong>
      </p>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-4">
        {videos.map((result, index) => {
          return <SearchResultItem key={index} videoData={result} />;
        })}
      </div>
    </>
  );
}

SearchResultsGrid.propTypes = {
  query: PropTypes.string,
  videos: PropTypes.array,
};
