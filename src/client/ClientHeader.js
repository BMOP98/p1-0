import React from 'react';
import { Link } from 'react-router-dom';

const ClientHeader = () => {
  const logout = () => {
    sessionStorage.setItem("item_key", "");
    window.location.href = "/";
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="#">Restaurant Reservations</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/reservation">New Reservations</Link>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )

};

export default ClientHeader;
