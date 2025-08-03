import "./App.css";
import MovieList from "./components/MovieList/MovieList";
import Navbar from "./components/Navbar/Navbar";
import Fire from "./assets/fire.png";
import Star from "./assets/glowing-star.png";
import Party from "./assets/partying-face.png";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <MovieList type="popular" title="Popular" emoji={Fire} />
        <MovieList type="top_rated" title="Top Rated" emoji={Star} />
        <MovieList type="upcoming" title="Upcoming" emoji={Party} />
      </main>
    </div>
  );
}

export default App;
