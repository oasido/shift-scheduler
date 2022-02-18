import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AvailabilityPage from './User/EmployeeAvailability/AvailabilityPage';
import Login from './Login/LoginPage';
import Register from './Register/RegisterPage';
import { UserContext } from './UserContext';
import AdminPage from './AdminControlPanel/AdminPage';
import RequestsPage from './AdminControlPanel/Requests/RequestsPage';
import MyRequests from './User/Requests/MyRequests';

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
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login loginCheckFetch={() => loginCheckFetch()} />} />
            <Route path="/" element={<AvailabilityPage />} />
            <Route path="/requests" element={<MyRequests />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/requests" element={<RequestsPage />} />
            <Route path="*" element={<Login loginCheckFetch={() => loginCheckFetch()} />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
};

export default Main;
