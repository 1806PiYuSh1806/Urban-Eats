import React, { useEffect, useState } from "react";
import classes from "./Search.module.css";
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const [term, setTerm] = useState(searchTerm || "");

  useEffect(() => {
    setTerm(searchTerm ?? '')
  }, [searchTerm])

  useEffect(() => {
    setTerm(searchTerm || "");
  }, [searchTerm]);

  const search = async () => {
    term ? navigate("/search/" + term) : navigate("/");
  };

  const changeInputfeild = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div className={classes.container}>
      <input
        type="text"
        placeholder="Search your favourite food.."
        onChange={changeInputfeild}
        onKeyUp={e => e.key === 'Enter' && search()}
        value={term}
      />
      <button onClick={search}>Search</button>
    </div>
  );
};

export default Search;
