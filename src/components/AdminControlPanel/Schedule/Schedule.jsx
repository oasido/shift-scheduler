import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addDays, eachDayOfInterval, nextSunday, isFriday } from 'date-fns';
import he from 'date-fns/locale/he';
import 'react-day-picker/style.css';
import chunk from 'lodash/chunk';
import sampleSize from 'lodash/sampleSize';
import ScheduleDesktopView from './ScheduleDesktopView';
import ScheduleMobileView from './ScheduleMobileView';
import { useUserContext } from '../../useUserContext';
import { useUsersContext } from '../useUsersContext';
import _ from 'lodash';
import Msg from './../../general/Msg';

const Schedule = () => {
  const { user } = useUserContext();
  const { users, refreshAllUsers } = useUsersContext();
  const [status, setStatus] = useState(null);

  // const [employees, setEmployees] = useState(null);
  const [datesArr, setDatesArr] = useState(null);
  const [table, setTable] = useState(null);
  const [sunday, setSunday] = useState(null);
  const [monday, setMonday] = useState(null);
  const [tuesday, setTuesday] = useState(null);
  const [wednesday, setWednesday] = useState(null);
  const [thursday, setThursday] = useState(null);
  const [friday, setFriday] = useState(null);

  useEffect(() => {
    refreshAllUsers();

    const currentDate = new Date();
    const start = nextSunday(currentDate);
    const end = addDays(start, 5);

    setDatesArr(eachDayOfInterval({ start, end }));
  }, []);

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
    // refreshAllUsers();

    // Remove unnecessary properties & admins from the users object
    const employees = Object.assign([], users);
    employees.forEach((employee, index) => {
      delete employee.hash;
      delete employee.salt;
      if (employee.admin) {
        employees.splice(index, 1);
      }
    });

    const schedule = [];

    for (let i = 0; i < datesArr.length; i++) {
      const morningShift = _.shuffle([...employees]);
      const formattedDate = format(datesArr[i], 'dd-MM-yyyy');

      morningShift.forEach((employee) => {
        employee.blockedDates.forEach((blockedDate) => {
          if (blockedDate.date === formattedDate && blockedDate.approved) {
            morningShift.splice(morningShift.indexOf(employee), 1);
            console.log(`Removed ${employee.username} from ${formattedDate}`);
          }
        });
      });

      const luckyEmployees = sampleSize(morningShift, 4);

      luckyEmployees.forEach((employee) => {
        const index = morningShift.indexOf(employee);
        morningShift.splice(index, 1);
      });

      const employeeSplit = chunk(luckyEmployees, 2);

      const [middleShift, eveningShift] = employeeSplit;

      let newShift = [];
      if (!isFriday(datesArr[i])) {
        newShift = [...morningShift, ...middleShift, ...eveningShift];
      } else {
        const fridayShift = _.sample(morningShift);
        newShift = [fridayShift];
      }
      schedule[i] = newShift;
    }

    const scheduleUID = schedule.map((day, dayIndex) =>
      day.map((employeeData, employeeIndex) => {
        return { ...employeeData, id: `${dayIndex}-${employeeIndex}` };
      })
    );
    setTable(scheduleUID);

    setSunday(scheduleUID[0]);
    setMonday(scheduleUID[1]);
    setTuesday(scheduleUID[2]);
    setWednesday(scheduleUID[3]);
    setThursday(scheduleUID[4]);
    setFriday(scheduleUID[5]);
  };

  const uploadSchedule = async (e) => {
    e.preventDefault();
    // add here a post request to the server w/ the json schedule object to be sent to the database
    const savedSchedule = [sunday, monday, tuesday, wednesday, thursday, friday];
    const savedBy = user.username;

    const response = await axios.post('/postSchedule', { savedSchedule, savedBy });
    if (response.data === 'Success') {
      setStatus({
        OK: true,
        bolded: 'בוצע!',
        msg: 'הסידור הועלה בהצלחה',
      });
    } else if (response.data === 'Error') {
      setStatus({
        OK: false,
        bolded: 'שגיאה!',
        msg: 'הסידור לא הועלה',
      });
    }
  };

  const formatDay = (date) => {
    return format(date, 'd LLLL', { locale: he });
  };

  const getDayHebrew = (date) => {
    return format(date, 'EEEE', { locale: he });
  };

  const days = {
    sunday,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    setSunday,
    setMonday,
    setTuesday,
    setWednesday,
    setThursday,
    setFriday,
  };

  return (
    <>
      <div>
        <div className="grid place-items-center mt-5" dir="rtl">
          <div className="w-5/6 flex flex-end justify-between">
            <h1 className="text-3xl font-semibold">צור סידור עבודה חדש</h1>
            <button className="bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300 hover:bg-sky-700 px-2 py-1 rounded-full text-white text-base font-semibold">
              הגדרות
            </button>
          </div>
        </div>
        <div className="flex lg:grid lg:place-items-center md:grid md:place-items-center ">
          <div className="md:block hidden w-full mt-10 md:w-11/12 lg:w-8/12" dir="rtl">
            {table ? (
              <div className="text-xl">
                <div className="font-bold grid grid-cols-6">
                  <div className="wrap p-2 border-b">
                    ראשון{' '}
                    <span className="block text-sm font-normal break-words">
                      {formatDay(datesArr[0])}
                    </span>
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

            <ScheduleDesktopView table={table} setTable={setTable} datesArr={datesArr} {...days} />
          </div>

          {/* <ScheduleMobileView
            table={table}
            datesArr={datesArr}
            getDayHebrew={getDayHebrew}
            formatDay={formatDay}
          /> */}
        </div>

        <form onSubmit={handleSchedule} className="flex justify-center my-5">
          <button
            type="submit"
            className="bg-sky-600 focus:outline-none focus:ring focus:ring-blue-300 hover:bg-sky-700 px-4 py-3 rounded-full text-white text-lg font-semibold"
          >
            הכן סידור {table && ' מחדש'} ⌘
          </button>
        </form>

        {table && (
          <form onSubmit={uploadSchedule} className="flex justify-center mt-5 mb-20">
            <div className="grid place-items-center">
              <button
                type="submit"
                className="bg-green-600 focus:outline-none focus:ring focus:ring-green-300 hover:bg-green-700 px-4 py-3 rounded-full text-white text-lg font-semibold"
              >
                העלה סידור
              </button>
              {status && <Msg bolded={status.bolded} msg={status.msg} OK={status.OK} />}
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Schedule;
