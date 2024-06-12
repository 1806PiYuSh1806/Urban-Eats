import React from "react";
import { useLoading } from "../../Hooks/useLoading";
import classes from "./Loading.module.css";

const Loading = () => {
  const { isLoading } = useLoading();
  if (!isLoading) return null;

  return (
    <div className={classes.container}>
      <div className={classes.items}>
        <img src="/loading.svg" alt="Loading!" />
        <h1>Loading...</h1>
      </div>
    </div>
  );
};

export default Loading;
