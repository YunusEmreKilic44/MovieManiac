import { Routes, Route } from "react-router-dom";

import "./App.css";
import MovieList from "./components/MovieList/MovieList";
import Navbar from "./components/Navbar/Navbar";
import Fire from "./assets/fire.png";
import Star from "./assets/glowing-star.png";
import Party from "./assets/partying-face.png";
import SingleMovie from "./components/MovieList/SingleMovie";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={<MovieList type="popular" title="Popular" emoji={Fire} />}
          />
          <Route
            path="/top_rated"
            element={
              <MovieList type="top_rated" title="Top Rated" emoji={Star} />
            }
          />
          <Route
            path="/upcoming"
            element={
              <MovieList type="upcoming" title="Upcoming" emoji={Party} />
            }
          />
          <Route path="/movie/:movieID" element={<SingleMovie />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
