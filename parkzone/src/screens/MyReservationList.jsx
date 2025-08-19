import React, { useEffect, useState } from "react";
import { getMyReservations, cancelReservation } from "../services/reservation";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyReservationList = () => {
  const [completedReservations, setCompletedReservations] = useState([]);
  const [confirmedReservations, setConfirmedReservations] = useState([]);
  const [cancelledReservations, setCancelledReservations] = useState([]);
  const [loadingCancel, setLoadingCancel] = useState({});

  const fetchReservations = () => {
    getMyReservations()
      .then((response) => {
        const reservations = response.data || response;
        setCompletedReservations(reservations.filter(res => res.status.toUpperCase() === "COMPLETED"));
        setConfirmedReservations(reservations.filter(res => res.status.toUpperCase() === "CONFIRMED"));
        setCancelledReservations(reservations.filter(res => res.status.toUpperCase() === "CANCELLED"));
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = (id) => {
    setLoadingCancel((prev) => ({ ...prev, [id]: true }));
    
    cancelReservation(id)
      .then(() => {
        toast.success(`Reservation ${id} cancelled successfully!`);
        fetchReservations(); 
      })
      .catch((error) => {
        console.error("Error cancelling reservation:", error);
        toast.error("Failed to cancel reservation.");
      })
      .finally(() => {
        setLoadingCancel((prev) => ({ ...prev, [id]: false }));
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Reservations</h2>
      
    
      <h3>Completed Reservations</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Location ID</th>
            <th>Vehicle ID</th>
            <th>Transaction ID</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {completedReservations.length > 0 ? (
            completedReservations.map((reservation) => (
              <tr key={reservation.reservationId}>
                <td>{reservation.reservationId}</td>
                <td>
                    <Link to={`/parking-details/${reservation.locationId}`}>
                     {reservation.locationId}
                    </Link>
                </td>
                <td>{reservation.vehicleId}</td>
                <td>
                  <Link to={`/transaction/${reservation.transactionId}`}>
                    {reservation.transactionId}
                  </Link>
                </td>
                <td>{new Date(reservation.startTime).toLocaleString()}</td>
                <td>{new Date(reservation.endTime).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No completed reservations found.</td>
            </tr>
          )}
        </tbody>
      </table>
      
      
      <h3>Confirmed Reservations</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Location ID</th>
            <th>Vehicle ID</th>
            <th>Transaction ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {confirmedReservations.length > 0 ? (
            confirmedReservations.map((reservation) => (
              <tr key={reservation.reservationId}>
                <td>{reservation.reservationId}</td>
                <td>
                    <Link to={`/parking-details/${reservation.locationId}`}>
                     {reservation.locationId}
                    </Link>
                </td>
                <td>{reservation.vehicleId}</td>
                <td>
                    <Link to={`/transaction/${reservation.transactionId}`}>
                      {reservation.transactionId}
                    </Link>
                </td>
                <td>{new Date(reservation.startTime).toLocaleString()}</td>
                <td>{new Date(reservation.endTime).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleCancel(reservation.reservationId)}
                    disabled={loadingCancel[reservation.reservationId]}
                  >
                    {loadingCancel[reservation.reservationId] ? "Cancelling..." : "Cancel"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No confirmed reservations found.</td>
            </tr>
          )}
        </tbody>
      </table>
      
    
      <h3>Cancelled Reservations</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Location ID</th>
            <th>Vehicle ID</th>
            <th>Transaction ID</th>
            <th>Start Time</th>
            <th>End Time</th>
          </tr>
        </thead>
        <tbody>
          {cancelledReservations.length > 0 ? (
            cancelledReservations.map((reservation) => (
              <tr key={reservation.reservationId}>
                <td>{reservation.reservationId}</td>
                <td>
                    <Link to={`/parking-details/${reservation.locationId}`}>
                     {reservation.locationId}
                    </Link>
                </td>
                <td>{reservation.vehicleId}</td>
                <td>
                  <Link to={`/transaction/${reservation.transactionId}`}>
                    {reservation.transactionId}
                  </Link>
                </td>
                <td>{new Date(reservation.startTime).toLocaleString()}</td>
                <td>{new Date(reservation.endTime).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No cancelled reservations found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default MyReservationList;

