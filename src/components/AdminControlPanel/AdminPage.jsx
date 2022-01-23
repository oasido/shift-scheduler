import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';
import { format, addDays, eachDayOfInterval, nextSunday } from 'date-fns';
import he from 'date-fns/locale/he';
import 'react-day-picker/style.css';
import HashLoader from 'react-spinners/HashLoader';
import { UserContext } from '../UserContext';

const AdminPage = () => {
  const user = useContext(UserContext);
  const [employees, setEmployees] = useState(null);
  const [datesArr, setDatesArr] = useState(null);
  const [table, setTable] = useState(null);

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

  const handleSchedule = async (e) => {
    e.preventDefault();

    const response = await axios.get('/getUsers');
    setEmployees(response.data);

    const currentDate = new Date();
    const start = nextSunday(currentDate);
    const end = addDays(start, 5);

    setDatesArr(eachDayOfInterval({ start, end }));

    // const schedule = {
    //   shift: {
    //     morning: [],
    //     middle: [],
    //     evening: [],
    //   },
    // };
  };

  return (
    <>
      <Navbar />
      {/* <div className="flex justify-center"> */}
      <div className="overflow-x-auto">
        <form onSubmit={handleSchedule}>
          <button type="submit" className="bg-blue-500 p-4 rounded">
            Generate
          </button>
        </form>
        <table className="table w-5/6 table-zebra" dir="rtl">
          <thead>
            <tr>
              <th>#</th>
              <th>ראשון</th>
              <th>שני</th>
              <th>שלישי</th>
              <th>רביעי</th>
              <th>חמישי</th>
              <th>שישי</th>
            </tr>
          </thead>
          <tbody>
            {
              <tr>
                <td>בוקר</td>
                {datesArr &&
                  datesArr.map(() => {
                    return (
                      <td>
                        {employees.map((employee) => {
                          return <div key={employee._id}>{employee.username}</div>;
                        })}
                      </td>
                    );
                  })}
              </tr>
            }
          </tbody>
        </table>
      </div>
      <form>{/* <button className="btn btn-base">הכן סידור</button> */}</form>
      {/* </div> */}
    </>
  );
};

export default AdminPage;
