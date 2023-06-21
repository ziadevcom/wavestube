import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchYoutube } from "../../Utils/youtube";

export default function Search() {
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
  }, [query]);

  return (
    <div id="searchResults">
      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong, please refresh the page</p>}
      {!isLoading && (
        <div>
          <p>
            You searched for <strong> {query} </strong>
          </p>
          {searchResults.items.map((result, index) => {
            return <li key={index}>{result.title}</li>;
          })}
        </div>
      )}
    </div>
  );
}
