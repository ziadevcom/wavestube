import PropTypes from "prop-types";
import { AudioContext } from "../../../Contexts/AudioContext";
import { fetchVideo } from "../../../Utils/youtube";
import { useContext } from "react";

export default function SearchResultItem({ videoData }) {
  const { setAudioStream, setPlaybackStarted } = useContext(AudioContext);
  const { title, thumbnail, views, uploaderVerified, url } = videoData;
  const videoId = url.slice(9);

  async function handleSearchResultClick() {
    setPlaybackStarted(false);
    try {
      const videoData = await fetchVideo(videoId);
      const response = await fetch(videoData.audioStreams[0].url, {
        method: "HEAD",
      });
      if (!response.ok)
        throw TypeError("Could not fetch audio stream from proxy.");
      return setAudioStream(videoData);
    } catch (error) {
      return handleSearchResultClick();
    }
  }

  return (
    <div className="group flex flex-col gap-4 bg-bg-dark rounded-sm text-left transition-all focus-within:scale-110 hover:scale-110 rouned-md overflow-hidden">
      <div className="relative">
        <img
          src={thumbnail}
          alt=""
          className="w-full brightness-50 group-hover:brightness-100 group-focus-within:brightness-100"
        />
        <button
          className="absolute bottom-1 right-1 bg-accent hover:bg-accent-light p-4 rounded-full w-12 h-12 self-end"
          onClick={handleSearchResultClick}
        >
          <img className="w-full" src="/play_icon.png" alt="" />
          <span className="sr-only">Click to play {title}</span>
        </button>
      </div>
      <h3 className="p-4">
        {videoData.title.slice(0, 40)}
        {videoData.title.length > 40 && "..."}
      </h3>
    </div>
  );
}

SearchResultItem.propTypes = {
  videoData: PropTypes.object,
};
