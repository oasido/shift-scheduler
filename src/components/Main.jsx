import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AvailabilityPage from './EmployeeAvailability/AvailabilityPage';
import Login from './Login/LoginPage';
import Register from './Register/RegisterPage';

const Main = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loginCheckFetch();
  }, []);

  const loginCheckFetch = async () => {
    await axios.get('/api/user').then((response) => setUser(response.data));
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Main;
