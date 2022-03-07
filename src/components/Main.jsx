import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AvailabilityPage from './User/EmployeeAvailability/AvailabilityPage';
import Login from './Login/LoginPage';
import Register from './Register/RegisterPage';
import { useUserContext } from './useUserContext';
import Schedule from './AdminControlPanel/Schedule';
import RequestsPage from './AdminControlPanel/Requests/RequestsPage';
import MyRequests from './User/Requests/MyRequests';
import Dashboard from './AdminControlPanel/Dashboard';
import Footer from './Footer';

const Main = () => {
  const { refresh } = useUserContext();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AvailabilityPage />} />
          <Route path="/requests" element={<MyRequests />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/schedule" element={<Schedule />} />
          {/* <Route path="/admin/history" element={<History />} /> */}
          <Route path="/admin/requests" element={<RequestsPage />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default Main;
