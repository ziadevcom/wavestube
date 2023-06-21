import Header from "./Components/Header/Header";
import AudioPlayer from "./Components/AudioPlayer/AudioPlayer";
import Body from "./Components/Body/Body";

function App() {
  return (
    <main className="grid grid-rows-3r grid-cols-1 items-center justify-center bg-bg-darker p-4 rounded w-full h-full md:w-4/5 md:h-4/5 md:p-8">
      <Header />
      <Body />
      <AudioPlayer />
    </main>
  );
}

export default App;
