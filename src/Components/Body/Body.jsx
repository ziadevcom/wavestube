import { Routes, Route } from "react-router-dom";
import Songs from "../Songs/Songs";
import Search from "../Search/Search";

export default function Body() {
  return (
    <Routes>
      <Route path="/" element={<Songs />}></Route>
      <Route path="/search" element={<Search />}></Route>
    </Routes>
  );
}
