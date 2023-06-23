import { useEffect, useState, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import { ReactComponent as MutedIcon } from "../../assets/muted.svg";
import { ReactComponent as LowVolumeIcon } from "../../assets/low_volume.svg";
import { ReactComponent as VolumeIcon } from "../../assets/volume.svg";
import { ReactComponent as PlayIcon } from "../../assets/play.svg";
import { ReactComponent as PauseIcon } from "../../assets/pause.svg";
import { secondsToMinutes } from "../../Utils/helpers";
import { AudioContext } from "../../Contexts/AudioContext";

function AudioPlayer() {
  const { audioStream } = useContext(AudioContext);
  const audioStreams = audioStream?.audioStreams
    .slice()
    .filter((s) => s.codec === "opus")
    .sort((a, b) => a.bitrate - b.bitrate);
  const [currentSong, setCurrentSong] = useState(
    new Audio(audioStreams[0].url)
  );
  const [currentTime, setCurrentTime] = useState(currentSong.currentTime);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(100);

  useEffect(() => {
    currentSong.ontimeupdate = () => setCurrentTime(currentSong.currentTime);

    currentSong.oncanplaythrough = () => playAudio();

    currentSong.onended = () => setPlaying(false);

    currentSong.preload = true;
  }, [currentSong]);

  useEffect(() => {
    currentSong.src = audioStreams[0].url;
  }, [audioStream]);

  function changeVolume(e) {
    setVolume(Number(e.target.value));
    currentSong.volume = e.target.value / 100;
  }

  function pauseAudio() {
    setPlaying(false);
    currentSong.pause();
  }

  function playAudio() {
    setPlaying(true);
    currentSong.play();
  }

  return (
    <div
      id="audioPlayer"
      className="flex flex-col md:flex-row justify-between items-center gap-4  w-full pd-container"
    >
      <p className="w-full text-center md:w-1/4 md:text-left">
        {audioStream.title}
      </p>
      <div className="w-full md:w-2/3 flex-grow flex flex-col items-center gap-4">
        <AudioTrack
          currentSong={currentSong}
          currentTime={currentTime}
          totalTime={audioStream.duration}
        />
        <div className="flex gap-4 w-full justify-between items-center ">
          <div className="flex flex-grow justify-center gap-4 ml-6 md:ml-0">
            <button
              disabled
              className="cursor-not-allowed"
              title="Not available yet."
            >
              Prev
            </button>
            {playing ? (
              <button
                className="group w-12 h-12 bg-bg-light rounded-full p-4"
                onClick={pauseAudio}
              >
                <PauseIcon />
              </button>
            ) : (
              <button
                className="group w-12 h-12 bg-bg-light rounded-full p-3"
                onClick={playAudio}
              >
                <PlayIcon />
              </button>
            )}
            <button
              disabled
              className="cursor-not-allowed"
              title="Not available yet."
            >
              Next
            </button>
          </div>
          {
            // Volume changer for mobile
          }
          <div className="md:hidden">
            <Volume volume={volume} handleVolumeChange={changeVolume} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center md:w-1/4 md:justify-end">
        {
          // Volume changer for desktops
        }
        <div className="hidden md:block">
          <Volume volume={volume} handleVolumeChange={changeVolume} />
        </div>
      </div>
    </div>
  );
}

function Volume({ volume, handleVolumeChange }) {
  const [visibility, setVisibility] = useState(false);

  function toggleVolumeSlider() {
    setVisibility(!visibility);
  }

  let volumeIcon;

  if (volume == 0) {
    volumeIcon = <MutedIcon />;
  } else if (volume <= 50) {
    volumeIcon = <LowVolumeIcon />;
  } else {
    volumeIcon = <VolumeIcon />;
  }

  return (
    <div className="group relative flex items-center gap-4">
      <button onClick={toggleVolumeSlider} className="h-6 w-6 md:w-8 md:h-8">
        {volumeIcon}
        <span className="sr-only">{volume}</span>
      </button>

      {visibility && (
        <div className="group-focus-within:visible invisible absolute -top-4 left-1/2 -rotate-90 origin-left z-5 p-4 pb-0 backdrop-blur-sm rounded-full">
          <label htmlFor="changeVolume" className="sr-only">
            Change volume
          </label>
          <input
            className="w-[100px]"
            onChange={handleVolumeChange}
            id="changeVolume"
            type="range"
            value={volume}
          />
        </div>
      )}
      <p
        aria-hidden="true"
        className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 absolute -left-4 -translate-x-1/2"
      >
        {volume}
      </p>
    </div>
  );
}

function AudioTrack({ currentSong, currentTime, totalTime: audioDuration }) {
  const totalDuration = useMemo(
    () => secondsToMinutes(audioDuration),
    [audioDuration]
  );

  const width = (currentTime / audioDuration) * 100;
  const currentTimeDisplay = secondsToMinutes(currentTime);

  function handleTrackClick(event) {
    currentSong.currentTime = event.target.value;
  }

  return (
    <div className="w-full flex flex-row gap-4 md:gap-8">
      <p className="text-sm md:text-base">
        {currentTimeDisplay.minutes}:{currentTimeDisplay.seconds}
      </p>
      <div
        id="audioTrack"
        className="group flex-grow flex flex-col 
      items-center justify-center relative"
      >
        <label htmlFor="trackSeekerInput" className="sr-only">
          Seek the track forward or backwards
        </label>
        <input
          type="range"
          id="trackSeekerInput"
          className="w-full opacity-0 cursor-pointer absolute z-10 "
          max={audioDuration}
          onInput={handleTrackClick}
        />
        <div
          id="trackFull"
          className="w-full bg-gray-400 h-1 rounded-full relative"
        >
          <div
            style={{ width: width + "%" }}
            id="trackRunning"
            className="h-full bg-accent-light absolute rounded-full"
          ></div>
        </div>
      </div>
      <p className="text-sm md:text-base">
        {totalDuration.minutes}:{totalDuration.seconds}
      </p>
    </div>
  );
}

Volume.propTypes = {
  volume: PropTypes.number,
  handleVolumeChange: PropTypes.func,
};

AudioTrack.propTypes = {
  currentSong: PropTypes.object,
  currentTime: PropTypes.number,
  totalTime: PropTypes.number,
};

export default AudioPlayer;
