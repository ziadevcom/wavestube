import Header from "./Components/Header/Header";
import AudioPlayer from "./Components/AudioPlayer/AudioPlayer";
import Body from "./Components/Body/Body";

function App() {
  return (
    <main className="grid grid-rows-3r grid-cols-1 items-center justify-center bg-bg-darker w-4/5 h-4/5 p-8 rounded">
      <Header />
      <Body />
      <AudioPlayer />
    </main>
  );
}

export default App;
