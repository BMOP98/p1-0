import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Reservation = () => {
  var item_valueid = sessionStorage.getItem("item_key");
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:4004/register";
      const verify = await fetch(url+"/"+item_valueid);
      const mess = await verify.json();
      if(!verify.ok){
        toast.error(mess.message || "Error al verificar");
      } else {
        const idcard = mess;
        const url = "http://localhost:4005/apireservation";
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idcard, date, hour })
        });
        const message = await response.json();
        if (!response.ok) {
          throw new Error("Response Status: " + response.status);
        } else {
          const Sendmail = await fetch("http://localhost:4006/apinotification/" + item_valueid, {
            method: 'POST',
            headers:{
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, hour })
          });
          if(Sendmail.ok){
            navigate('/dashboard');
            toast.success(message);
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="text"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder='dd/mm/AAAA'
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hour">Hour</label>
          <input
            type="text"
            className="form-control"
            id="hour"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            placeholder='24H00'
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Reservation;
