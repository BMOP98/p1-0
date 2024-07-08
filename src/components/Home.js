import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="container text-center">
    <h2>Welcome to the Restaurant Reservations App</h2>
    <div className="d-flex justify-content-around mt-4">
      <Link to="/login" className="btn btn-primary">Login</Link>
      <Link to="/register" className="btn btn-secondary">Register</Link>
    </div>
  </div>
);

export default Home;
