import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signin } from '../services/user'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  
  const navigate = useNavigate()

  const onLogin = async () => {
    if (email.length === 0) {
      toast.warn('Please enter email');
      return;
    } else if (password.length === 0) {
      toast.warn('Please enter password');
      return;
    }
  
    try {
      const result = await signin(email, password);
      console.log(result)
      if (result.status === 200) {
        toast.success('Welcome to ParkZone');
  
        const { id, email, jwt ,role } = result.data;
        sessionStorage.setItem('jwt', `Bearer ${jwt}`);
        sessionStorage.setItem('id', id);
        sessionStorage.setItem('email', email);
        if(role==="CUSTOMER")
           navigate('/home');
        else if(role==="ADMIN")
          navigate('/dashboard');
        else
          navigate('/sessionList');
      }else{
        toast.error('Bad Credentials');
      }
    } catch (error) {
      console.error("Login Error:", error);
  
      if (error.response) {
        const errorMessage = error.response.data?.error || "Login failed. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Network error. Check your connection.");
      }
    }
  };
  

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
  <div className="card p-4 shadow" style={{ width: "100%", maxWidth: "400px" }}>
    <h2 className="text-center mb-4 header">Login</h2>

    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="form-control"
        id="email"
        placeholder="Enter your email"
      />
    </div>

    <div className="mb-3">
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="form-control"
        id="password"
        placeholder="Enter your password"
      />
    </div>

    <div className="mb-3">
      <div>
        Don't have an account ? <Link to="/register">Register here</Link>
      </div>
      <div>
        Forgot password ? <Link to="/forgotPassword">Click here</Link>
      </div>
      <button onClick={onLogin} className="btn btn-success w-100 mt-3">
        Login
      </button>
    </div>
  </div>
</div>

  )
}

export default Login