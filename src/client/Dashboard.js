import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        var item_valueid = sessionStorage.getItem("item_key");
        const url = "http://localhost:4004/register";
        const verify = await fetch(url + "/" + item_valueid);
        const mess = await verify.json();
        const idcard = mess;
        const response = await fetch('http://localhost:4005/apireservation/' + idcard);
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else if (response.status === 404) {
          setError('No reservations found.');
        } else {
          throw new Error('Error fetching reservations');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
        setError('Error fetching reservations');
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4005/apireservation/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setReservations(reservations.filter(reservation => reservation._id !== id));
        toast.success(response);
      } else {
        toast.error(response);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Reservations</h2>
      <p>Manage your Reservations here.</p>
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Hour</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation => (
              <tr key={reservation._id}>
                <td>{reservation._id}</td>
                <td>{reservation.date}</td>
                <td>{reservation.hour}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(reservation._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
