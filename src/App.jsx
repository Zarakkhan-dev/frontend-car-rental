import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CarBookingForm from './Components/Carbooking/carBooking';
import CarDetailsForm from './Components/Car/Car';
import FuelingAndMaintenanceForm from './Components/CarFuel/carFuel';
import CardDetails from './Components/Card';
import CarMaintenanceForm from './Components/Carmaintenance/carMaintainance';
import AuthPage from './Components/auth/authPage';

function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to the Car Rental Service</h1>
      <Link to="/rent-car" className="text-blue-500 underline mt-4 block">
        Go to Rent a Car Form
      </Link>
    </div>
  );
}

function App() {
  return <AuthPage/>
}

export default App;
