import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLocationById } from "../services/location"; 
import { toast } from "react-toastify";

function ParkingDetails() {
  const { locationId } = useParams();
  const navigate = useNavigate();

  const [parkingData, setParkingData] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [calculatedRate, setCalculatedRate] = useState(0);

  useEffect(() => {
    const getParkingData = async () => {
      try {
        const response = await getLocationById(locationId);
        setParkingData(response.data);
      } catch (error) {
        toast.error("Failed to load parking details!");
      }
    };
    getParkingData();
  }, [locationId]);

  const getISOTimeString = (timeString) => {
    const now = new Date();
    const [hours, minutes] = timeString.split(":");
    now.setHours(hours, minutes, 0, 0);
    return now.toISOString();
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    setEndTime("");
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;

    if (!startTime) {
      toast.warning("Please select start time first!");
      return;
    }

    const minEndTime = new Date(new Date(`1970-01-01T${startTime}:00`).getTime() + 60 * 60 * 1000)
      .toTimeString()
      .slice(0, 5);

    if (newEndTime < minEndTime) {
      toast.warning("End time must be at least 1 hour after start time!");
      return;
    }

    setEndTime(newEndTime);
  };

  useEffect(() => {
    if (startTime && endTime && parkingData) {
      const startISO = getISOTimeString(startTime);
      const endISO = getISOTimeString(endTime);
      const diffHours = (new Date(endISO) - new Date(startISO)) / (1000 * 60 * 60);
      setCalculatedRate(diffHours * parkingData.hourlyRate);
    } else {
      setCalculatedRate(0);
    }
  }, [startTime, endTime, parkingData]);

  const navigateToSeatBooking = () => {
    if (!startTime || !endTime) {
      toast.error("Please select both start and end time!");
      return;
    }

    const storedData = {
      locationId,
      startTime: getISOTimeString(startTime),
      endTime: getISOTimeString(endTime),
      calculatedRate,
      totalSeats: parkingData.totalSeats,
      rows: parkingData.rows,
      columns: parkingData.columns
    };

    sessionStorage.setItem("parkingDetails", JSON.stringify(storedData));

    navigate(`/seatBooking`);
  };

  if (!parkingData) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Parking Details</h1>
      <div className="card shadow p-4">
        <table className="table table-bordered">
          <tbody>
            <tr><td><strong>Location Name</strong></td><td>{parkingData.locationName}</td></tr>
            <tr><td><strong>Address</strong></td><td>{parkingData.address}</td></tr>
            <tr><td><strong>Hourly Rate</strong></td><td>₹{parkingData.hourlyRate}/hr</td></tr>
            <tr><td><strong>Total Seats</strong></td><td>{parkingData.totalSeats}</td></tr>
            <tr><td><strong>Rows</strong></td><td>{parkingData.rows}</td></tr>
            <tr><td><strong>Columns</strong></td><td>{parkingData.columns}</td></tr>
            <tr><td><strong>Opening Time</strong></td><td>{parkingData.openingTime}</td></tr>
            <tr><td><strong>Closing Time</strong></td><td>{parkingData.closingTime}</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-center mt-4">Select Slot Time</h2>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <div>
          <label className="form-label">Start Time:</label>
          <input 
            type="time" 
            className="form-control" 
            value={startTime} 
            min={parkingData.openingTime}
            max={parkingData.closingTime}
            onChange={handleStartTimeChange} 
          />
        </div>
        <div>
          <label className="form-label">End Time:</label>
          <input 
            type="time" 
            className="form-control" 
            value={endTime} 
            min={startTime ? new Date(new Date(`1970-01-01T${startTime}:00`).getTime() + 60 * 60 * 1000).toTimeString().slice(0, 5) : ""}
            max={parkingData.closingTime}
            disabled={!startTime} 
            onChange={handleEndTimeChange} 
          />
        </div>
      </div>

      {calculatedRate > 0 && <h3 className="text-center mt-3">Total Price: ₹{calculatedRate.toFixed(2)}</h3>}

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={navigateToSeatBooking}>
          Show Availability
        </button>
      </div>
    </div>
  );
}

export default ParkingDetails;
