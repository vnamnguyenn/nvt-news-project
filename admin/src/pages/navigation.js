import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => {
  return (
    <Fragment>
      <h3>Logo</h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts">Post</Link>
        </li>
        <li>
          <Link to="/video">Contact</Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default Navigation;
