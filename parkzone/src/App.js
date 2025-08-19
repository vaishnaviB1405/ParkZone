import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import UserList from './screens/UserList';
import Login from './screens/Login';
import Register from './screens/Register'
import AddParkingForm from './screens/AddParkingForm';
import LocationList from './screens/locationList';
import UpdateLocation from './screens/UpdateLocation';
import SessionList from './screens/SessionList';
import AddEmployee from './screens/AddEmployee';
import ReservationList from './screens/ReservationList'
import UserDetails from './screens/UserDetails';
import TransactionDetails from './screens/TransactionDetails'
import MyReservationList from './screens/MyReservationList'
import ForgotPassword from './screens/ForgotPassword'
import Home from './screens/Home';
import SearchResults from './screens/SearchResults';
import ParkingDetails from './screens/ParkingDetails';
import SeatBooking from './screens/SeatBooking';
import PaymentGateway from './screens/ParkingGateway';
import Dashboard from './screens/Dashboard';
function App() {
  return (
    <div className='container-fluid'>
      <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/payment-gateway" element={<PaymentGateway />} />
       <Route path="/seatBooking" element={<SeatBooking />} />
       <Route path="/parking-details/:locationId" element={<ParkingDetails />} />
       <Route path="/search-results" element={<SearchResults/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/myReservationList" element={<MyReservationList />} />
        <Route path="/transaction/:id" element={<TransactionDetails />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path='/reservationList' element={<ReservationList />} />
        <Route path='/sessionList' element={<SessionList />} />
        <Route path="/update-location/:id" element={<UpdateLocation />} />
        <Route path='/locationList' element={<LocationList />} />
        <Route path='/addLocation' element={<AddParkingForm />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/addEmployee' element={<AddEmployee />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
