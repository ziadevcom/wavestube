import Header from "./Components/Header/Header";
import AudioPlayer from "./Components/AudioPlayer/AudioPlayer";
import Body from "./Components/Body/Body";

function App() {
  return (
    <main className="flex flex-col items-center justify-top gap-4 bg-bg-darker rounded w-full h-full md:w-4/5">
      <Header />
      <Body />
      <AudioPlayer />
    </main>
  );
}

export default App;
