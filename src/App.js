import React, { Component } from "react";
import Axios from "axios";
import "./App.css";
import SearchForm from "./Components/SearchForm";
import GifList from "./Components/GifList";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      gifs: [],
      loadingState: true,
    };
  }

  componentDidMount() {
    // fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIF_API}`)
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ gifs: data.data }))
    //   .catch((error) => console.log("Error fetcing and parsing data...", error));
    // Axios.get(`http://api.giphy.com/v1/gifs/trending?api_key=${process.env.REACT_APP_GIF_API}`)
    //   .then((response) =>
    //     this.setState({
    //       gifs: response.data.data,
    //     })
    //   )
    //   .catch((error) => console.log("Error fetching and parsing data...", error));
    this.performSearch();
  }

  performSearch = (searchTerms = "bears") => {
    Axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIF_API}&q=${searchTerms}`)
      .then((response) =>
        this.setState({
          gifs: response.data.data,
          loadingState: false,
        })
      )
      .catch((error) => console.log("Error fetching and parsing data...", error));
  };

  render() {
    return (
      <div>
        <div className="main-header">
          <div className="inner">
            <h1 className="main-title">GifSearch</h1>
            <SearchForm search={this.performSearch} />
          </div>
        </div>
        <div className="main-content">{this.state.loadingState ? <p>Loading...</p> : <GifList data={this.state.gifs} />}</div>
      </div>
    );
  }
}
