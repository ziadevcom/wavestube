import { PropTypes } from "prop-types";

const githubSVG = (
  <>
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M20 56a4 4 0 0 0 4-4 8 8 0 0 1 2.35-5.67s-13.69-1.53-16.6-7.41A21.67 21.67 0 0 1 8 29.42 17.23 17.23 0 0 1 11.9 18a15.43 15.43 0 0 1-.77-4.82C11.13 11 11 10 12 8c4.48 0 8 .85 11.37 3.52A39.58 39.58 0 0 1 32 10.7a39.58 39.58 0 0 1 8.63.82C44 8.85 47.52 8 52 8c1 1.95.87 3 .87 5.18A15.43 15.43 0 0 1 52.1 18 17.23 17.23 0 0 1 56 29.42a21.67 21.67 0 0 1-1.75 9.5c-2.91 5.88-16.6 7.41-16.6 7.41A8 8 0 0 1 40 52a4 4 0 0 0 4 4"></path>
      <path d="M24 50.88c-4 2-6.31-.43-8.75-2S11 46.75 8 48"></path>
      <ellipse cx="22.81" cy="31.72" rx="3.19" ry="4.82"></ellipse>
      <ellipse cx="41.19" cy="31.72" rx="3.19" ry="4.82"></ellipse>
    </g>
  </>
);
const linkedinSVG = (
  <>
    {" "}
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <line x1="53" y1="56" x2="53" y2="32"></line>
      <line x1="23" y1="56" x2="23" y2="20"></line>
      <path d="M23 32c0-6.63 6.72-12 15-12s15 5.37 15 12"></path>
      <line x1="11" y1="8" x2="11" y2="14"></line>
      <line x1="11" y1="20" x2="11" y2="56"></line>
    </g>
  </>
);

function IconLink({ href, text, svg }) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <span className="sr-only">{text}</span>
      <svg
        className="w-8 h-8 stroke-accent hover:stroke-accent-light transition-all"
        viewBox="0 0 64 64"
      >
        {svg}
      </svg>
    </a>
  );
}

function Socials() {
  return (
    <div id="socials" className="flex items-center gap-2">
      <IconLink
        href="https://github.com/ziadevcom"
        text="Github"
        svg={githubSVG}
      />
      <IconLink
        href="https://www.linkedin.com/in/ziadev/"
        text="LinkedIn"
        svg={linkedinSVG}
      />
    </div>
  );
}

IconLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  svg: PropTypes.node,
};

export default Socials;