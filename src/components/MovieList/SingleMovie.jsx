import React from "react";
import { useParams } from "react-router-dom";

const SingleMovie = () => {
  const { movieID } = useParams();
  return <h2>Single Movie - {movieID}</h2>;
};

export default SingleMovie;
