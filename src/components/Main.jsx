import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AvailabilityPage from './User/EmployeeAvailability/AvailabilityPage';
import Login from './Login/LoginPage';
import Register from './Register/RegisterPage';
import { useUserContext } from './useUserContext';
import AdminPage from './AdminControlPanel/AdminPage';
import RequestsPage from './AdminControlPanel/Requests/RequestsPage';
import MyRequests from './User/Requests/MyRequests';
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
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/requests" element={<RequestsPage />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default Main;
