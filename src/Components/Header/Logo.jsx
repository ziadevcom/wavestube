import { Link } from "react-router-dom";
const wavesSVG = (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 48 48"
    id="b"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-none stroke-accent h-12 w-12 md:w-14 md:h-14"
  >
    <g id="c">
      <line
        id="d"
        className="o"
        x1="13.1159"
        y1="11.7737"
        x2="13.1159"
        y2="36.2263"
      />

      <line
        id="e"
        className="o"
        x1="8.8039"
        y1="16.8329"
        x2="8.8039"
        y2="31.1671"
      />

      <line id="f" className="o" x1="4.5" y1="21.4705" x2="4.5" y2="26.5295" />

      <line
        id="g"
        className="o"
        x1="17.4569"
        y1="16.8329"
        x2="17.4569"
        y2="31.1671"
      />

      <line
        id="h"
        className="o"
        x1="21.9465"
        y1="21.4705"
        x2="21.9465"
        y2="26.5295"
      />
    </g>

    <g id="i">
      <line
        id="j"
        className="o"
        x1="34.6693"
        y1="11.7737"
        x2="34.6693"
        y2="36.2263"
      />

      <line
        id="k"
        className="o"
        x1="30.3573"
        y1="16.8329"
        x2="30.3573"
        y2="31.1671"
      />

      <line
        id="l"
        className="o"
        x1="26.0535"
        y1="21.4705"
        x2="26.0535"
        y2="26.5295"
      />

      <line
        id="m"
        className="o"
        x1="39.0104"
        y1="16.8329"
        x2="39.0104"
        y2="31.1671"
      />

      <line
        id="n"
        className="o"
        x1="43.5"
        y1="21.4705"
        x2="43.5"
        y2="26.5295"
      />
    </g>
  </svg>
);

export default function Logo() {
  return (
    <Link to="/">
      <div id="logo" className="flex items-center gap-2">
        {wavesSVG}
        <p className="font-primary text-xl md:text-2xl">
          Waves<span className="text-primary">Tube</span>
        </p>
      </div>
    </Link>
  );
}
