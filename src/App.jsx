import Searchbar from "./components/Searchbar";
import FotoList from "./components/FotoList";
import FotoAmpliada from "./components/FotoAmpliada";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fotos, setFotos] = useState([]);
  const [fotoAmpliada, setFotoAmpliada] = useState(null);
  const [activateSarch, setActivateSarch] = useState(false);

  const fetchData = async ({ query, categoria }) => {
    const apikey = import.meta.env.VITE_UNSPLASH_API;
    if (query || categoria) {
      let searchQuery = query;
      if (query && categoria) {
        searchQuery = `${query} ${categoria}`;
      } else if (categoria) {
        searchQuery = categoria;
      }
      const response = await axios.get(
        "https://api.unsplash.com/search/photos/",
        {
          params: {
            client_id: apikey,
            query: searchQuery,
          },
        }
      );
      setFotos(response.data.results);
      return;
    }

    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: {
            client_id: apikey,
            count: 10,
          },
        }
      );
      setFotos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(query, categoria);
  }, [query, categoria]);

  useEffect(() => {
    if (activateSarch) {
      fetchData({ query, categoria });
      setActivateSarch(false);
    }
  }, [activateSarch]);

  return (
    <div className="container">
      <Searchbar
        setQuery={setQuery}
        setCategoria={setCategoria}
        setActivateSarch={setActivateSarch}
      />
      <FotoList fotos={fotos} setFotoAmpliada={setFotoAmpliada} />
      {fotoAmpliada && (
        <FotoAmpliada foto={fotoAmpliada} setFotoAmpliada={setFotoAmpliada} />
      )}
    </div>
  );
}

export default App;
