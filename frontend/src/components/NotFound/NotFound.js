import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';

const NotFound = ({message, linkRoute, linkText}) => {
  return (
    <div className={classes.container}>
        {message}
      <Link to={linkRoute}>{linkText}</Link>
    </div>
  )
}

NotFound.defaultProps = {
    message: "Nothing Found!",
    linkRoute: "/",
    linkText: "Go To Home Page!",
}

export default NotFound
