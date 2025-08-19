import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchBookedSeats } from "../services/seat"; 

function SeatsBooking() {
  const navigate = useNavigate();
  const storedDetails = JSON.parse(sessionStorage.getItem("parkingDetails")) || {};
  const { locationId, parkingName, totalSeats, rows, columns, startTime, endTime, calculatedRate } = storedDetails;

  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]); // Store already booked seats

  useEffect(() => {
    if (!startTime || !endTime || !locationId || !totalSeats || !rows || !columns) {
      toast.error("Session expired or missing data! Redirecting...");
      setTimeout(() => navigate("/parking-details"), 2000);
      return;
    }

    // Fetch booked seats
    const getBookedSeats = async () => {
      try {
        const seats = await fetchBookedSeats(locationId);
        setBookedSeats(seats);
      } catch (error) {
        toast.error("Failed to fetch booked seats.");
      }
    };

    getBookedSeats();
  }, [startTime, endTime, locationId, totalSeats, rows, columns, navigate]);

  const handleBookSeat = () => {
    if (!vehicleType || !vehicleNo || selectedSeat === null) {
      toast.warning("Please select a vehicle type, enter vehicle number, and choose a seat.");
      return;
    }

    // Save booking details in session storage
    const bookingDetails = {
      locationId,
      vehicleType,
      vehicleNo,
      seatNo: selectedSeat,
      startTime,
      endTime,
      calculatedRate,
    };

    sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
    toast.success("Seat selection saved! Redirecting to payment...");
    setTimeout(() => navigate(`/payment-gateway`), 1500);
  };

  const generateSeats = () => {
    const seats = [];
    let seatNumber = 1;

    for (let i = 0; i < rows; i++) {
      const rowSeats = [];

      for (let j = 0; j < columns; j++) {
        if (seatNumber > totalSeats) break; // Stop when total seats are reached
        rowSeats.push(seatNumber++);
      }

      seats.push(rowSeats);
    }

    return seats;
  };

  return (
    <div className="container my-5">
      <ToastContainer position="top-right" autoClose={2000} />

      <h1 className="text-center mb-4">Seat Booking - {parkingName || "Unknown"}</h1>

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Vehicle Type:</label>
            <select className="form-control" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}>
              <option value="">Select Vehicle Type</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Wagon">Wagon</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Vehicle Number:</label>
            <input
              type="text"
              className="form-control"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              placeholder="Enter Vehicle Number"
            />
          </div>
        </div>
      </div>

      <h3 className="text-center">Choose a Parking Slot</h3>
      <div className="d-flex flex-column align-items-center mt-3">
        {generateSeats().map((row, rowIndex) => (
          <div key={rowIndex} className="d-flex">
            {row.map((seat) => (
              <button
                key={seat}
                className={`btn m-1 ${
                  bookedSeats.includes(seat)
                    ? "btn-danger disabled" // Booked seat styling
                    : selectedSeat === seat
                    ? "btn-success"
                    : "btn-outline-primary"
                }`}
                onClick={() => !bookedSeats.includes(seat) && setSelectedSeat(seat)}
                disabled={bookedSeats.includes(seat)}
              >
                {seat}
              </button>
            ))}
          </div>
        ))}
      </div>

      <h4 className="text-center mt-4">
        Slot Timing: {startTime ? new Date(startTime).toLocaleTimeString() : "N/A"} -{" "}
        {endTime ? new Date(endTime).toLocaleTimeString() : "N/A"}
      </h4>
      <h4 className="text-center">Total Price: ₹{calculatedRate ? calculatedRate.toFixed(2) : "N/A"}</h4>

      <div className="text-center mt-4">
        <button
          className="btn btn-primary px-4"
          onClick={handleBookSeat}
          disabled={!vehicleType || !vehicleNo || selectedSeat === null}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

export default SeatsBooking;