import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light mb-3">
      <Link to="/">
        <span className="navbar-brand mb-0 h1">Return Home</span>
      </Link>
      <div className="ml-auto">
        <Link to="/addContact">
          <button className="btn btn-success">Add a new User</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
