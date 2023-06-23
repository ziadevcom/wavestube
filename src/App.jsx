import { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import AudioPlayer from "./Components/AudioPlayer/AudioPlayer";
import Body from "./Components/Body/Body";
import { AudioContext } from "./Contexts/AudioContext";

function App() {
  const [audioStream, setAudioStream] = useState(null);
  const [currentSong, setCurrentSong] = useState(new Audio());
  const [playbackStarted, setPlaybackStarted] = useState(null);

  useEffect(() => {
    const audioStreamURL = audioStream?.audioStreams
      .slice()
      .filter((s) => s.codec === "opus")
      .sort((a, b) => a.bitrate - b.bitrate)[0]?.url;

    setCurrentSong((prevSong) => {
      const newSong = prevSong;
      newSong.src = audioStreamURL;
      return newSong;
    });
  }, [audioStream]);

  return (
    <main className="flex flex-col items-center justify-top gap-4 bg-bg-darker rounded w-full h-full md:w-4/5">
      <AudioContext.Provider
        value={{
          audioStream,
          setAudioStream,
          currentSong,
          playbackStarted,
          setPlaybackStarted,
        }}
      >
        <Header />
        <Body />
        {audioStream && <AudioPlayer />}
      </AudioContext.Provider>
    </main>
  );
}

export default App;
