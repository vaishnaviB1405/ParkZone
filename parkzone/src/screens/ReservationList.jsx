import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllReservations } from "../services/reservation";

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getAllReservations();
        setReservations(data);
      } catch (error) {
        console.error("Failed to fetch reservations", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">All Reservations</h2>
      <table className="table table-striped table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Transaction</th>
            <th>Seat</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <tr key={reservation.reservationId}>
                <td>{reservation.reservationId}</td>
                <td>
                  <Link to={`/user/${reservation.userId}`}>
                    {reservation.userId}
                  </Link>
                </td>
                <td>
                  <Link to={`/transaction/${reservation.transactionId}`}>
                    {reservation.transactionId}
                  </Link>
                </td>
                <td>{reservation.seatId}</td>
                <td>{new Date(reservation.startTime).toLocaleString()}</td>
                <td>{new Date(reservation.endTime).toLocaleString()}</td>
                <td>{reservation.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No reservations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllReservations;
