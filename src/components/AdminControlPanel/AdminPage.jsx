import { useState, useContext, Fragment, useEffect } from 'react';
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
  const [datesArr, setDatesArr] = useState(null);
  const [table, setTable] = useState(null);

  useEffect(() => {
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

  class Shift {
    constructor(weekday, morning, middle, evening) {
      this.weekday = weekday;
      this.morning = morning;
      this.middle = middle;
      this.evening = evening;
    }
  }

  const handleSchedule = async (e) => {
    e.preventDefault();

    const response = await axios.get('/getUsers');
    const employees = response.data;

    const schedule = [];

    for (let i = 0; i < datesArr.length; i++) {
      const morningShift = [...employees];
      const luckyEmployees = _.sampleSize(morningShift, 4);

      luckyEmployees.forEach((employee) => {
        const index = morningShift.indexOf(employee);
        morningShift.splice(index, 1);
      });

      const employeeSplit = _.chunk(luckyEmployees, 2);

      const [middleShift, eveningShift] = employeeSplit;

      const test = new Shift(i, morningShift, middleShift, eveningShift);
      schedule[i] = test;
    }
    // console.log(schedule);
    // console.log(datesArr);
    setTable(schedule);
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
              {table &&
                datesArr.map((e, i) => {
                  return (
                    <Fragment key={i}>
                      <div className="table-cell" key={i}>
                        {table &&
                          table[i].morning.map((employee) => {
                            return (
                              <div key={employee._id}>
                                <p key={employee._id}>{employee.username}</p>
                              </div>
                            );
                          })}
                        {table &&
                          table[i].middle.map((employee) => {
                            return (
                              <div key={employee._id}>
                                <p key={employee._id}>{employee.username}</p>
                              </div>
                            );
                          })}
                        {table &&
                          table[i].evening.map((employee) => {
                            return (
                              <div key={employee._id}>
                                <p key={employee._id}>{employee.username}</p>
                              </div>
                            );
                          })}
                      </div>
                    </Fragment>
                  );
                })}
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
