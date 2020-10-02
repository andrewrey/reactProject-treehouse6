import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";

const App = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("bears");
  const [isLoading, setIsLoading] = useState(true);

  const performSearch = (value) => {
    setQuery(value);
  };

  useEffect(() => {
    console.log("hahah", process.env.REACT_APP_GIF_API);
    Axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIF_API}&q=${query}`)
      .then((response) => setData(response.data.data))
      .catch((error) => console.log("Error fetching and parsing data...", error))
      .finally(() => setIsLoading(false));
  }, [query]);

  return (
    <React.Fragment>
      <div className="main-header">
        <div className="inner">
          <h1 className="main-title">GifSearch</h1>
          <SearchForm onSearch={performSearch} />
        </div>
      </div>
      <div className="main-content">{isLoading ? <p>Loading...</p> : <GifList data={data} />}</div>
    </React.Fragment>
  );
};

export default App;
