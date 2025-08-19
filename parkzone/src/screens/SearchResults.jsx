import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchLocations } from "../services/location";
import DefaultImage from "../Assets/default-location.jpg";

function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const searchedLocation = params.get("location");

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getLocations = async () => {
      const data = await fetchLocations(searchedLocation);
      setLocations(data);
    };
    getLocations();
  }, [searchedLocation]);

  const handleRowClick = (locationData) => {
    navigate(`/parking-details/${locationData.locationId}`);
  };

  return (
    <div className="container text-center py-5 bg-light min-vh-100">
      <h1 className="mb-4">Search Results</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-hover shadow bg-white rounded">
          <thead className="bg-primary text-white">
            <tr>
              <th>Image</th>
              <th>Location Name</th>
              <th>Address</th>
              <th>Hourly Rate</th>
            </tr>
          </thead>
          <tbody>
            {locations.length > 0 ? (
              locations.map((locationData, index) => (
                <tr key={index} onClick={() => handleRowClick(locationData)} className="clickable-row">
                  <td>
                    <img
                      src={locationData.locationImagePath || DefaultImage}
                      alt="Location"
                      className="rounded img-thumbnail"
                      width="100"
                      height="100"
                      style={{ objectFit: "cover" }}
                    />
                  </td>
                  <td>{locationData.locationName}</td>
                  <td>{locationData.address}</td>
                  <td>{`₹${locationData.hourlyRate}/hr`}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SearchResults;

