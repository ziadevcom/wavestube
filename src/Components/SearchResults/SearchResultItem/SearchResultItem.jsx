import PropTypes from "prop-types";

export default function SearchResultItem({ videoData }) {
  const { title, thumbnail, views, uploaderVerified, url } = videoData;
  const videoId = url.slice(9);

  return (
    <div className="group flex flex-col gap-4 bg-bg-dark rounded-sm text-left transition-all hover:scale-110 rouned-md overflow-hidden">
      <div className="relative">
        <img
          src={thumbnail}
          alt=""
          className="w-full brightness-50 group-hover:brightness-100"
        />
        <button className="absolute bottom-1 right-1 bg-accent hover:bg-accent-light p-4 rounded-full w-12 h-12 self-end">
          <img className="w-full" src="/play_icon.png" alt="" />
          <span className="sr-only">Click to play {title}</span>
        </button>
      </div>
      <h3 className="p-4">{videoData.title.slice(0, 70)}...</h3>
    </div>
  );
}

SearchResultItem.propTypes = {
  videoData: PropTypes.object,
};
