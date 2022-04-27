import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AvailabilityPage from './User/EmployeeAvailability/AvailabilityPage';
import Login from './Login/LoginPage';
import { useUserContext } from './useUserContext';
import Schedule from './AdminControlPanel/Schedule';
import RequestsPage from './AdminControlPanel/Requests/RequestsPage';
import Users from './AdminControlPanel/Users';
import MyRequests from './User/Requests/MyRequests';
import Dashboard from './AdminControlPanel/Dashboard';
import Footer from './Footer';
import WeekSchedule from './WeekSchedule';
import ScheduleHistory from './AdminControlPanel/ScheduleHistory';
import { AppShell } from '@mantine/core';

const Main = () => {
  const { refresh } = useUserContext();

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <AppShell padding={0} footer={<Footer />} fixed={true}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/block" element={<AvailabilityPage />} />
            <Route path="/" element={<WeekSchedule />} />
            <Route path="/requests" element={<MyRequests />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/schedule" element={<Schedule />} />
            <Route path="/admin/schedule-history" element={<ScheduleHistory />} />
            <Route path="/admin/requests" element={<RequestsPage />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AppShell>
    </>
  );
};

export default Main;
