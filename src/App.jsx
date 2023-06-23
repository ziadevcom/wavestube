import { useState } from "react";
import Header from "./Components/Header/Header";
import AudioPlayer from "./Components/AudioPlayer/AudioPlayer";
import Body from "./Components/Body/Body";
import { AudioContext } from "./Contexts/AudioContext";

function App() {
  const [audioStream, setAudioStream] = useState(null);
  return (
    <main className="flex flex-col items-center justify-top gap-4 bg-bg-darker rounded w-full h-full md:w-4/5">
      <AudioContext.Provider value={{ audioStream, setAudioStream }}>
        <Header />
        <Body />
        {audioStream && <AudioPlayer />}
      </AudioContext.Provider>
    </main>
  );
}

export default App;
