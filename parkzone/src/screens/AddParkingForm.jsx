import React, { useState } from 'react';
import { toast } from "react-toastify";
import { addLocation } from "../services/location";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function AddParkingForm() {
  const navigate = useNavigate(); // Initialize navigate

  const [formData, setFormData] = useState({
    locationName: "",
    address: "",
    longitude: "",
    latitude: "",
    hourlyRate: "",
    rows: "",
    columns: "",
    totalSeats: "",
    openingTime: "",
    closingTime: "",
    userId: "",
    cctv: false,
    contact: "",
    valetParking: false,
    isAcitve: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (formData[key] === "" || formData[key] === null) {
        toast.error(`Please fill the ${key.replace(/([A-Z])/g, " $1").toLowerCase()} field.`);
        return;
      }
    }
    try {
      const result = await addLocation(formData);
      if (result.status === 201) {
        toast.success("Parking spot added successfully!");
        navigate("/locationList"); // Navigate to locationList after success
      } else {
        toast.error(result.data.msg);
      }
    } catch (error) {
      toast.error("Insertion failed. Try again!");
    }
  };

  return (
    <div>
      <nav style={{ backgroundColor: '#333', padding: '10px 20px', color: '#fff', textAlign: 'center' }}>
        <h1 style={{ margin: '0', fontSize: '24px' }}>Admin Dashboard</h1>
      </nav>

      <div style={{ maxWidth: '450px', margin: '50px auto', padding: '30px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Add Parking Spot</h2>
        <form onSubmit={handleSubmit}>
          {[{ label: "Location Name", name: "locationName" },
            { label: "Address", name: "address" },
            { label: "Longitude", name: "longitude" },
            { label: "Latitude", name: "latitude" },
            { label: "Hourly Rate", name: "hourlyRate" },
            { label: "Total Seats", name: "totalSeats" },
            { label: "Rows", name: "rows" },
            { label: "Columns", name: "columns" },
            { label: "User ID", name: "userId" },
            { label: "Contact", name: "contact" }
          ].map(({ label, name }) => (
            <div key={name} style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }} htmlFor={name}>{label}</label>
              <input
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={label}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>
          ))}

          {[{ label: "Opening Time", name: "openingTime" },
            { label: "Closing Time", name: "closingTime" }
          ].map(({ label, name }) => (
            <div key={name} style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px' }} htmlFor={name}>{label}</label>
              <input
                type="time"
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            {[{ label: "CCTV Available", name: "cctv" }, { label: "Valet Parking", name: "valetParking" }].map(({ label, name }) => (
              <label key={name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  name={name}
                  checked={formData[name]}
                  onChange={handleChange}
                />
                {label}
              </label>
            ))}
          </div>

          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: '6px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
