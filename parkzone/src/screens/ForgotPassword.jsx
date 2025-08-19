import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sendOtp, resetPassword } from "../services/user";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    recievedOtp: "",
    password: "",
    confirmPassword: "",
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
    } else {
      toast.error("Please enter your email.");
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

  const handleResetPassword = async () => {
    if (!formData.otpVerified) {
      toast.error("Please verify your OTP first.");
      return;
    }

    if (!formData.password || !formData.confirmPassword) {
      toast.error("Please enter and confirm your password.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const resetData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const result = await resetPassword(resetData);
      console.log(result);
      if (result.status === 200) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(result.data.msg);
      }
    } catch (error) {
      toast.error("Failed to reset password. Try again!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleResetPassword();
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="text-center mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
            {!formData.otpSent && (
              <button type="button" className="btn btn-primary mt-2" onClick={handleSendOtp}>
                Send OTP
              </button>
            )}
          </div>

          {formData.otpSent && (
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">Enter OTP</label>
              <input type="text" className="form-control" id="otp" value={formData.otp} onChange={handleChange} required />
              <button type="button" className="btn btn-success mt-2" onClick={handleVerifyOtp}>
                Verify OTP
              </button>
            </div>
          )}

          {formData.otpVerified && (
            <>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">New Password</label>
                <input type="password" className="form-control" id="password" minLength="8" value={formData.password} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

