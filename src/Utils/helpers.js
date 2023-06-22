let instances = [];

export async function getLatestPipedInstanceURLs() {
  if (instances.length > 0) {
    return instances;
  }
  const response = await fetch(
    "https://raw.githubusercontent.com/wiki/TeamPiped/Piped-Frontend/Instances.md"
  );
  const text = await response.text();

  // Convert raw text into an array of instance objects
  const lines = text.split("\n");
  lines.forEach((line, index) => {
    const split = line.split("|");
    if (split.length >= 4 && index > 3) {
      instances.push({
        name: split[0]?.trim(),
        apiurl: split[1]?.trim(),
        locations: split[2]?.trim(),
        cdn: split[3]?.trim(),
      });
    }
  });
  return instances;
}

export async function getInstanceURL() {
  const officialInstance = await getOfficialInstanceURL();
  const randomInstance =
    instances[Math.floor(Math.random() * instances.length)];
  if (officialInstance) {
    return officialInstance.apiurl;
  } else {
    return randomInstance.apiurl;
  }
}

export async function getOfficialInstanceURL() {
  instances = await getLatestPipedInstanceURLs();
  return instances.find((instance) =>
    instance.name.toLowerCase().includes("official")
  );
}

export function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function secondsToMinutes(seconds) {
  return {
    minutes: Math.floor(seconds / 60)
      .toString()
      .padStart(2, 0),
    seconds: Math.floor(seconds % 60)
      .toString()
      .padStart(2, 0),
  };
}
