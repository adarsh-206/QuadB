import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux';
import JobDetails from './components/JobDetails'

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path="/"
          element={<PrivateRoute element={<Home />} />}
        />
        <Route path="/job/:jobId" element={<PrivateRoute element={<JobDetails />} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
