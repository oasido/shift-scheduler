import { useState, useContext, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';
import { format, addDays, eachDayOfInterval, nextSunday, getDay } from 'date-fns';
import he from 'date-fns/locale/he';
import 'react-day-picker/style.css';
import HashLoader from 'react-spinners/HashLoader';
import { UserContext } from '../UserContext';
import _ from 'lodash';

const AdminPage = () => {
  const user = useContext(UserContext);
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

    // const response = await axios.get('/getUsers');
    // const employees = response.data;

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

  const uploadSchedule = (e) => {
    e.preventDefault();
  };

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
          <div className="w-5/6">
            <h1 className="text-3xl font-semibold">צור סידור עבודה חדש</h1>
          </div>
        </div>
        <div className="flex lg:grid lg:place-items-center md:grid md:place-items-center ">
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
          <div className="table md:hidden w-full mt-10 md:w-9/12 lg:w-8/12" dir="rtl">
            {table ? (
              datesArr.map((e, i) => {
                return (
                  <div key={i} className="text-2xl w-7/12 mt-3 mx-auto rounded bg-tran">
                    <div className="font-bold" key={i}>
                      <div className="border-b-2" key={i}>
                        {getDayHebrew(datesArr[i])} <span className="block text-sm font-normal break-words">{formatDay(datesArr[i])}</span>
                      </div>
                    </div>
                    {table[i].morning.map((employee) => {
                      return (
                        <div key={employee._id} className="font-semibold text-lg">
                          <p key={employee._id}>{employee.username}</p>
                        </div>
                      );
                    })}
                    {table[i].middle.map((employee) => {
                      return (
                        <div key={employee._id} className="font-semibold text-lg">
                          <p key={employee._id}>
                            {employee.username}
                            <span className="font-semibold text-xs"> (אמצע)</span>
                          </p>
                        </div>
                      );
                    })}
                    {table[i].evening.map((employee) => {
                      return (
                        <div key={employee._id} className="font-semibold text-lg">
                          <p key={employee._id}>
                            {employee.username}
                            <span className="font-semibold text-xs"> (ערב)</span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            ) : (
              <h3 className="text-center text-lg">לחץ "הכן סידור" ע"מ ליצור סידור עבודה חדש.</h3>
            )}
          </div>
        </div>
        <form onSubmit={handleSchedule} className="flex justify-center my-5">
          <button type="submit" className="bg-sky-600 focus:outline-none focus:ring focus:ring-blue-300 hover:bg-sky-700 px-4 py-3 rounded-full text-white text-lg font-semibold">
            הכן סידור {table && ' מחדש'} ⌘
          </button>
        </form>
        {table && (
          <form onSubmit={uploadSchedule} className="flex justify-center mt-5 mb-20">
            <button
              type="submit"
              className="bg-green-600 focus:outline-none focus:ring focus:ring-green-300 hover:bg-green-700 px-4 py-3 rounded-full text-white text-lg font-semibold"
            >
              העלה סידור
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default AdminPage;
