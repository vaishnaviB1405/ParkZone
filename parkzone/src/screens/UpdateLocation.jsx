import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getLocationById, updateLocationDetails } from "../services/location";

export default function UpdateLocation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    locationName: "",
    address: "",
    longitude: "",
    latitude: "",
    hourlyRate: "",
    totalSeats: "",
    rows: "",
    columns: "",
    openingTime: "",
    closingTime: "",
    isActive: false,
    contact: "",
    cctv: false,
    valetParking: false,
    locationImagePath: "",
    userId: "",
  });

  useEffect(() => {
    fetchLocationDetails();
  }, []);

  const fetchLocationDetails = async () => {
    try {
      const result = await getLocationById(id);
      if (result.status === 200) {
        setLocation(result.data);
      } else {
        toast.error("Failed to fetch location details.");
      }
    } catch (error) {
      toast.error("Error fetching location.");
    }
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocation({
      ...location,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateLocationDetails(location,id);
      if (result.status === 200) {
        toast.success("Location updated successfully.");
        navigate("/locationList"); // Navigate back to location list
      } else {
        toast.error("Failed to update location.");
      }
    } catch (error) {
      toast.error("Error updating location.");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update Location</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label className="form-label">Location Name</label>
          <input
            type="text"
            name="locationName"
            className="form-control"
            value={location.locationName}
            onChange={handleFormChange}
            required
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={location.address}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Longitude</label>
          <input
            type="number"
            step="any"
            name="longitude"
            className="form-control"
            value={location.longitude}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Latitude</label>
          <input
            type="number"
            step="any"
            name="latitude"
            className="form-control"
            value={location.latitude}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hourly Rate (₹)</label>
          <input
            type="number"
            name="hourlyRate"
            className="form-control"
            value={location.hourlyRate}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Total Seats</label>
          <input
            type="number"
            name="totalSeats"
            className="form-control"
            value={location.totalSeats}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="row">
          <div className="col">
            <label className="form-label">Rows</label>
            <input
              type="number"
              name="rows"
              className="form-control"
              value={location.rows}
              onChange={handleFormChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Columns</label>
            <input
              type="number"
              name="columns"
              className="form-control"
              value={location.columns}
              onChange={handleFormChange}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <label className="form-label">Opening Time</label>
            <input
              type="time"
              name="openingTime"
              className="form-control"
              value={location.openingTime}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Closing Time</label>
            <input
              type="time"
              name="closingTime"
              className="form-control"
              value={location.closingTime}
              onChange={handleFormChange}
              required
            />
          </div>
        </div>

        <div className="mb-3 mt-3">
          <label className="form-label">Contact</label>
          <input
            type="text"
            name="contact"
            className="form-control"
            value={location.contact}
            onChange={handleFormChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">User ID</label>
          <input
            type="number"
            name="userId"
            className="form-control"
            value={location.userId}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            name="isActive"
            className="form-check-input"
            checked={location.isActive}
            onChange={handleFormChange}
          />
          <label className="form-check-label">Is Active</label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            name="cctv"
            className="form-check-input"
            checked={location.cctv}
            onChange={handleFormChange}
          />
          <label className="form-check-label">CCTV Available</label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            name="valetParking"
            className="form-check-input"
            checked={location.valetParking}
            onChange={handleFormChange}
          />
          <label className="form-check-label">Valet Parking Available</label>
        </div>

        <button type="submit" className="btn btn-success mt-3">
          Update
        </button>
        <button type="button" className="btn btn-secondary mt-3 ms-2" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
