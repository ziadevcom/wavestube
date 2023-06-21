// import { Link } from "react-router-dom";
import Logo from "./Logo";
import Socials from "./Socials";
import Search from "./SearchForm/SearchForm";

function Header() {
  return (
    <header className="flex justify-between w-full">
      <Logo />
      <Search />
      <Socials />
    </header>
  );
}

export default Header;
