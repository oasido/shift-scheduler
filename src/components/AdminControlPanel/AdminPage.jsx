import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';
import { format, addDays, eachDayOfInterval, nextSunday } from 'date-fns';
import he from 'date-fns/locale/he';
import 'react-day-picker/style.css';
import HashLoader from 'react-spinners/HashLoader';
import { UserContext } from '../UserContext';
import _ from 'lodash';

const AdminPage = () => {
  const user = useContext(UserContext);
  // const [employees, setEmployees] = useState(null);
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
    const employees = response.data;

    const currentDate = new Date();
    const start = nextSunday(currentDate);
    const end = addDays(start, 5);

    setDatesArr(eachDayOfInterval({ start, end }));

    const luckyEmployees = _.sampleSize(employees, 4);

    luckyEmployees.forEach((employee) => {
      const index = employees.indexOf(employee);
      employees.splice(index, 1);
    });

    const employeeSplit = _.chunk(luckyEmployees, 2);

    const [middleShift, eveningShift] = employeeSplit;

    const schedule = {
      morning: employees,
      middle: middleShift,
      evening: eveningShift,
    };
    return schedule;
  };

  return (
    <>
      <Navbar />
      {/* <div className="flex justify-center"> */}
      <div className="overflow-x-auto">
        <div className="table w-5/6" dir="rtl">
          <div className="table-header-group">
            <div className="table-row">
              {/* <div className="table-cell text-right">type</div> */}
              <div className="table-cell text-right">ראשון</div>
              <div className="table-cell text-right">שני</div>
              <div className="table-cell text-right">שלישי</div>
              <div className="table-cell text-right">רביעי</div>
              <div className="table-cell text-right">חמישי</div>
              <div className="table-cell text-right">שישי</div>
            </div>
          </div>
          <div className="table-row-group">
            <div className="table-row">
              <div className="table-cell"></div>
              <div className="table-cell"></div>
              <div className="table-cell"></div>
              <div className="table-cell"></div>
              <div className="table-cell"></div>
              <div className="table-cell"></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSchedule} className="m-10 flex justify-center ">
          <button type="submit" className="bg-blue-500 p-4 rounded">
            ⌘ Generate
          </button>
        </form>
      </div>
      <form>{/* <button className="btn btn-base">הכן סידור</button> */}</form>
      {/* </div> */}
    </>
  );
};

export default AdminPage;
