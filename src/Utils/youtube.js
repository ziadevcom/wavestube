import { getInstanceURL, getOfficialInstanceURL } from "./helpers.js";

// Recursively make requests until we get results successfully
// Make request to official instance
// If successfull => return search results
// If fails => call recusively and use some other instance
export async function searchYoutube(query) {
  try {
    const instanceURL = await getInstanceURL();

    const requestURL = encodeURI(
      `${instanceURL}/search?q=${query}&filter=videos`
    );

    const response = await fetch(requestURL);
    const results = await response.json();

    return {
      count: results.items.length,
      items: results.items,
    };
  } catch (error) {
    console.log(error);
    return await searchYoutube(query);
  }
}

// Fetch search suggetions & update relevant state
export async function fetchSuggestions(searchQuery, setSuggestions, setError) {
  if (!searchQuery) return;
  try {
    const instanceURL = await getInstanceURL();
    const response = await fetch(
      `${instanceURL}/suggestions?query=${searchQuery}`
    );

    const suggestions = await response.json();

    setSuggestions(suggestions);
    setError(false);
  } catch (e) {
    console.log(e);
    setError(true);
  }
}
