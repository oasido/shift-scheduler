import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AvailabilityPage from './EmployeeAvailability/AvailabilityPage';
import Login from './Login/LoginPage';

const Home = () => {
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

export default Home;
