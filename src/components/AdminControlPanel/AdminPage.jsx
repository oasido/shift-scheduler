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

  const formatDay = (date) => {
    return format(date, 'E, d LLLL', { locale: he });
  };

  return (
    <>
      <Navbar />
      <div className="">
        <div className="grid place-items-center mt-5" dir="rtl">
          <div className="w-5/6">
            <h1 className="text-3xl font-semibold">צור סידור עבודה חדש</h1>
          </div>
        </div>
        <div id="generated-table" className="flex lg:grid lg:place-items-center md:grid md:place-items-center ">
          <div className="md:table hidden w-full mt-10 md:w-9/12 lg:w-8/12" dir="rtl">
            {table ? (
              <div className="table-header-group text-xl">
                <div className="table-row font-bold">
                  <div className="wrap table-cell p-2 border-b">
                    ראשון <span className="block text-sm font-normal break-words">{formatDay(datesArr[0])}</span>
                  </div>
                  <div className="table-cell p-2 border-b">
                    שני <span className="block text-sm font-normal">{formatDay(datesArr[1])}</span>
                  </div>
                  <div className="table-cell p-2 border-b">
                    שלישי<span className="block text-sm font-normal">{formatDay(datesArr[2])}</span>
                  </div>
                  <div className="table-cell p-2 border-b">
                    רביעי<span className="block text-sm font-normal">{formatDay(datesArr[3])}</span>
                  </div>
                  <div className="table-cell p-2 border-b">
                    חמישי<span className="block text-sm font-normal">{formatDay(datesArr[4])}</span>
                  </div>
                  <div className="table-cell p-2 border-b">
                    שישי<span className="block text-sm font-normal">{formatDay(datesArr[5])}</span>
                  </div>
                </div>
              </div>
            ) : (
              <h3 className="text-center text-lg">לחץ "הכן סידור" ע"מ ליצור סידור עבודה חדש.</h3>
            )}
            <div className="table-row-group">
              <div className="table-row font-semibold text-lg">
                {table &&
                  datesArr.map((e, i) => {
                    return (
                      <Fragment key={i}>
                        <div className="table-cell" key={i}>
                          {table &&
                            table[i].morning.map((employee) => {
                              return (
                                <div className="whitespace-nowrap odd:bg-white even:bg-slate-50" key={employee._id}>
                                  <p key={employee._id}>{employee.username}</p>
                                </div>
                              );
                            })}
                          {table &&
                            table[i].middle.map((employee) => {
                              return (
                                <div className="whitespace-nowrap odd:bg-white even:bg-slate-50" key={employee._id}>
                                  <p className="p-1" key={employee._id}>
                                    {employee.username}
                                    <span className="font-semibold text-xs"> (אמצע)</span>
                                  </p>
                                </div>
                              );
                            })}
                          {table &&
                            table[i].evening.map((employee) => {
                              return (
                                <div className="whitespace-nowrap divide-y odd:bg-white even:bg-slate-50" key={employee._id}>
                                  <p className="p-1" key={employee._id}>
                                    {employee.username}
                                    <span className="font-semibold text-xs"> (ערב)</span>
                                  </p>
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
        </div>
      </div>

      <form onSubmit={handleSchedule} className="flex justify-center mt-10">
        <button type="submit" className="bg-sky-600 focus:outline-none focus:ring focus:ring-blue-300 hover:bg-sky-700 px-4 py-3 rounded-full text-white text-lg font-semibold">
          הכן סידור ⌘
        </button>
      </form>
      <form>{/* <button className="btn btn-base">הכן סידור</button> */}</form>
    </>
  );
};

export default AdminPage;
