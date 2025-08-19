import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { processPayment } from "../services/payment";

function PaymentGateway() {
  const navigate = useNavigate();

  // Extract stored data
  const bookingDetails = JSON.parse(sessionStorage.getItem("bookingDetails")) || {};
  const parkingDetails = JSON.parse(sessionStorage.getItem("parkingDetails")) || {};
  const userId = Number(sessionStorage.getItem("id")) || 0;
  const authToken = sessionStorage.getItem("jwt") || "";

  // Extract values from bookingDetails
  const {
    locationId = 0,
    vehicleType = "UNKNOWN",
    vehicleNo = "UNKNOWN",
    seatNo = 0,
    startTime = new Date().toISOString(),
    endTime = new Date().toISOString(),
    calculatedRate = 0,
  } = bookingDetails;

  // Extract values from parkingDetails (fallbacks if missing)
  const {
    locationId: parkingLocationId = locationId,
    startTime: parkingStartTime = startTime,
    endTime: parkingEndTime = endTime,
  } = parkingDetails;

  // Ensure locationId is properly assigned
  const finalLocationId = Number(parkingLocationId || locationId);

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.warn("Please select a payment method.");
      return;
    }

    setLoading(true);

    const transactionData = {
      trasactionDto: {
        userId: Number(userId),
        amount: calculatedRate,
        paymentMethod: paymentMethod.toUpperCase().replace(" ", "_"),
        status: "SUCCESS",
      },
      reservationDto: {
        userId: Number(userId),
        locationId: finalLocationId,
        seatId: Number(seatNo),
        vehicleId: 0,
        transactionId: 0,
        startTime: parkingStartTime,
        endTime: parkingEndTime,
        status: "CONFIRMED",
      },
      vehicleDto: {
        vehicleNumber: vehicleNo,
        vehicleType: vehicleType.toUpperCase(),
      },
    };

    try {
      const response = await processPayment(transactionData, authToken);
      toast.success(response.message || "Payment successful!");

      sessionStorage.removeItem("bookingDetails");
      sessionStorage.removeItem("parkingDetails");

      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h1 className="text-center mb-3">Payment Gateway</h1>

        <h5 className="text-center text-muted">
          <strong>Vehicle:</strong> {vehicleType.toUpperCase()} - {vehicleNo}
        </h5>
        <h5 className="text-center text-muted">
          <strong>Seat Number:</strong> {seatNo}
        </h5>
        <h4 className="text-center mt-3 text-success">
          <strong>Total Amount:</strong> ₹{calculatedRate.toFixed(2)}
        </h4>

        <div className="form-group mt-3">
          <label className="form-label"><strong>Select Payment Method:</strong></label>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Choose Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Cash">Cash</option>
          </select>
        </div>

        <button
          className="btn btn-success w-100 mt-4"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Make Payment"}
        </button>
      </div>
    </div>
  );
}

export default PaymentGateway;
