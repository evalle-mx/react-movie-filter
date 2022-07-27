import './App.css';
import { useEffect, useState } from "react";
import Movie from "./component/Movie";
import Filter from "./component/Filter";
import { motion, AnimatePresence } from "framer-motion";

function App() {

  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeGenre, setActiveGenre] = useState(0);

  useEffect(() => {
    fetchPopular();
  }, [])
  const fetchPopular = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=d5c35e51c81488b19da7c1f572507a3d&language=en-US&page=1');
    const movies = await data.json();
    console.log(movies);
    setPopular(movies.results);
    setFiltered(movies.results);
  }

  return (
    <div className="App">
      <Filter 
        popular={popular} setFiltered={setFiltered} 
        activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
      <motion.div layout className="popular-movies">
        <AnimatePresence>
          {filtered.map(mov => {
            return <Movie key={mov.id} movie={mov} />;
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;
