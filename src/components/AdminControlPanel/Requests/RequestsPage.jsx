import { useState, useContext, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar';
import axios from 'axios';
import { format, addDays, eachDayOfInterval, nextSunday, getDay } from 'date-fns';
import he from 'date-fns/locale/he';
import 'react-day-picker/style.css';
import HashLoader from 'react-spinners/HashLoader';
import { useUserContext } from '../../useUserContext';
import _ from 'lodash';
import RequestsList from './RequestsList';

const RequestsPage = () => {
  const { user } = useUserContext();
  const [employees, setEmployees] = useState(null);
  const [datesArr, setDatesArr] = useState(null);
  const [table, setTable] = useState(null);

  useEffect(() => {
    axios.get('/getUsers').then((response) => setEmployees(response.data));

    const currentDate = new Date();
    const start = nextSunday(currentDate);
    const end = addDays(start, 5);

    setDatesArr(eachDayOfInterval({ start, end }));
  }, []);

  let navigate = useNavigate();

  switch (true) {
    case !user:
      return (
        <>
          <div className="w-screen h-screen grid place-items-center">
            <HashLoader className="content-center" size={100} />
            <h3>Loading, please wait...</h3>
          </div>
        </>
      );
    case user && user.admin === false && user.isAuthenticated === true:
      navigate('/');
      break;
    case user && user.isAuthenticated === false:
      navigate('/login');
      break;
    default:
      break;
  }

  const formatDay = (date) => {
    return format(date, 'd LLLL', { locale: he });
  };

  const getDayHebrew = (date) => {
    return format(date, 'EEEE', { locale: he });
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="grid place-items-center mt-5" dir="rtl">
          <div className="w-5/6 lg:w-4/6">
            <h1 className="text-3xl font-semibold">בקשות ואילוצים</h1>
            <RequestsList />
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestsPage;
