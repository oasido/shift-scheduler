import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import HashLoader from 'react-spinners/HashLoader';
import { useUserContext } from '../../useUserContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const ScheduleHistory = () => {
  const { user } = useUserContext();
  const [shifts, setShifts] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get('/getScheduleHistory').then((response) => setShifts(response.data));
  }, []);

  switch (true) {
    case !user:
      return (
        <>
          <div className="grid w-screen h-screen place-items-center">
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

  return (
    <>
      <Navbar />
      <div>
        <div className="grid mt-5 place-items-center" dir="rtl">
          <div className="w-11/12 lg:w-4/6">
            <h1 className="text-3xl font-semibold">סידורי עבודה</h1>
            <table className="w-full mx-auto my-10 border-separate shadow-sm table-auto md:w-5/6 lg:w-4/6">
              <thead>
                <tr className="text-xl text-right">
                  <th className="w-1/12">#</th>
                  <th className="w-5/12">תאריך</th>
                  <th className="w-2/12">שעה</th>
                  <th className="w-3/12">ע"י</th>
                  <th className="w-1/12"></th>
                </tr>
              </thead>
              <tbody>
                {shifts &&
                  shifts.map((shift, i) => {
                    const date = new Date(Date.parse(shift.date));
                    const time = format(date, 'HH:mm');
                    return (
                      <tr className="text-lg font-medium text-gray-900" key={shift._id}>
                        <td>{i + 1}</td>
                        <td>{shift.name}</td>
                        <td>{time}</td>
                        <td>{shift.savedBy}</td>
                        <td>X</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleHistory;
