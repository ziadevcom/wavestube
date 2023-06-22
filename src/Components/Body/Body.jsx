import { Routes, Route } from "react-router-dom";
import Songs from "../Songs/Songs";
import SearchResults from "../SearchResults/SearchResults";

export default function Body() {
  return (
    <Routes>
      <Route path="/" element={<Songs />}></Route>
      <Route path="/search" element={<SearchResults />}></Route>
    </Routes>
  );
}
