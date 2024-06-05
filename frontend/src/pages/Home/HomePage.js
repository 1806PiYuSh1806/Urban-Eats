import React, { useEffect, useReducer } from "react";
import { getAll } from "../../services/foodService";
import Thumnails from "../../components/Thumnails/Thumnails";

const initialState = { foods: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOODS_LOADED":
      return { ...state, foods: action.payload };
    default:
      return state;
  }
};

const HomePage = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);
  const { foods } = state;

  useEffect(() => {
    getAll().then((foods) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, []);

  return (
    <>
      <Thumnails foods={foods} />
    </>
  );
};

export default HomePage;
