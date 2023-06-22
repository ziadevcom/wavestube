// import { Link } from "react-router-dom";
import Logo from "./Logo";
import Socials from "./Socials";
import Search from "./SearchForm/SearchForm";

function Header() {
  return (
    <header className="flex flex-col items-center gap-4 w-full md:flex-row md:justify-between pd-container">
      <Logo />
      <Search />
      <Socials />
    </header>
  );
}

export default Header;
