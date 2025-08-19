import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../services/user";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    role: "",
    securityCode: "",
    otp: "",
    recievedOtp: "",
    otpSent: false,
    otpVerified: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSendOtp = async () => {
    if (formData.email) {
      setFormData((prevState) => ({ ...prevState, otpSent: true }));
      try {
        const result = await sendOtp(formData.email);
        console.log(result);
        if (result && result.data && result.data.msg) {
          setFormData((prevState) => ({
            ...prevState,
            recievedOtp: result.data.msg,
          }));
          toast.success("OTP Sent Successfully!");
        }
      } catch (error) {
        toast.error("Error sending OTP. Try again!");
      }
    }
  };

  const handleVerifyOtp = () => {
    if (formData.otp) {
      if (formData.recievedOtp === formData.otp) {
        setFormData((prevState) => ({ ...prevState, otpVerified: true }));
        toast.success("OTP Verified");
      } else {
        toast.error("Invalid OTP");
      }
    }
  };

  const onSignup = async () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.birthDate ||
      !formData.role ||
      (formData.role === "ADMIN" && !formData.securityCode)
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (formData.role === "ADMIN" && formData.securityCode !== "Admin@123") {
      toast.error("Invalid Security Code");
      return;
    }

    if (!formData.otpVerified) {
      toast.error("Please verify your OTP before signing up.");
      return;
    }

    const signupData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      birthDate: formData.birthDate,
      role: formData.role,
      status: true,
    };

    try {
      const result = await signup(signupData);
      console.log(result);
      if (result.status === 201) {
        toast.success(result.data.msg);
        navigate("/");
      } else {
        toast.error(result.data.msg);
      }
    } catch (error) {
      toast.error("Signup failed. Try again!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup();
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {!formData.otpSent && (
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            )}
          </div>

          {formData.otpSent && (
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                Enter OTP
              </label>
              <input
                type="text"
                className="form-control"
                id="otp"
                value={formData.otp}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-success mt-2"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="phoneNumber"
              pattern="^[1-9][0-9]{7,14}$"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              minLength="8"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="birthDate" className="form-label">
              Birth Date
            </label>
            <input
              type="date"
              className="form-control"
              id="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              className="form-select"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {formData.role === "ADMIN" && (
            <div className="mb-3">
              <label htmlFor="securityCode" className="form-label">
                Security Code
              </label>
              <input
                type="text"
                className="form-control"
                id="securityCode"
                value={formData.securityCode}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-success w-100">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

