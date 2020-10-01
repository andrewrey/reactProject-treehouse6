import React from "react";
import Gif from "./Gif";
import NoGifs from "./NoGifs";

const GifList = ({ data }) => {
  let gifs;
  if (data.length > 0) {
    gifs = data.map((item) => <Gif url={item.images.fixed_height.url} key={item.id} />);
  } else {
    gifs = <NoGifs />;
  }

  return <ul className="gif-list">{gifs}</ul>;
};

export default GifList;
