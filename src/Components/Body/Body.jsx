import { Routes, Route } from "react-router-dom";
import Songs from "../Songs/Songs";
import SearchResults from "../SearchResults/SearchResults";

export default function Body() {
  return (
    <div className="flex-grow overflow-y-auto overflow-x-hidden scrollbar pd-container">
      <Routes>
        <Route path="/" element={<Songs />}></Route>
        <Route path="/search" element={<SearchResults />}></Route>
      </Routes>
    </div>
  );
}
