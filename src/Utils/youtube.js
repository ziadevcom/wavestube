import { getInstanceURL, getOfficialInstanceURL } from "./helpers.js";

// Recursively make requests until we get results successfully
// Make request to official instance
// If successfull => return search results
// If fails => call recusively and use some other instance
// Also recursively call if request takes more than "REQUEST_TIMEOUT" or request fails at all
export async function searchYoutube(query, officialInstance = true) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

  try {
    const instanceURL = officialInstance
      ? await getOfficialInstanceURL()
      : await getInstanceURL();

    const requestURL = encodeURI(
      `${instanceURL}/search?q=${query}&filter=videos`
    );

    const response = await fetch(requestURL, { signal: controller.signal });
    const results = await response.json();

    return {
      count: results.items.length,
      items: results.items,
    };
  } catch (error) {
    console.log(error);
    clearInterval(timeoutId);
    return await searchYoutube(query, (officialInstance = false));
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
