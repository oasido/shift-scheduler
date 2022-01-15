import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AvailabilityPage from './EmployeeAvailability/AvailabilityPage';
import Login from './Login/LoginPage';

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
          <Route path="/" element={<AvailabilityPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Main;
