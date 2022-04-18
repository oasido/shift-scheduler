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
import Swal from 'sweetalert2';

const Schedule = () => {
  const { user } = useUserContext();
  const { users, refreshAllUsers } = useUsersContext();
  const [status, setStatus] = useState(null);
  const [button, setButton] = useState(true);

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
    setButton(false);

    const savedSchedule = [sunday, monday, tuesday, wednesday, thursday, friday];
    const savedBy = user.username;

    // Implement warnings if someone has bad shifts
    const badShifts = [];
    savedSchedule.map((day, dayIndex) => {
      if (dayIndex < 5) {
        day.map((user, userIndex) => {
          if (day.length - 4 <= userIndex) {
            badShifts.push(user);
          }
        });
      }
    });
    console.log(badShifts);
    const sortedBadShifts = chunk(badShifts, 4);

    console.log(sortedBadShifts);


    setTimeout(() => {
      setButton(true);
    }, 3000);
  };

  const formatDay = (date) => {
    return format(date, 'd LLLL', { locale: he });
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
        <div className="grid mt-5 place-items-center" dir="rtl">
          <div className="flex justify-between w-11/12 lg:w-4/6 flex-end">
            <h1 className="text-3xl font-semibold">צור סידור עבודה חדש</h1>
            <button className="px-2 py-1 text-base font-semibold text-white bg-gray-600 rounded-full focus:outline-none focus:ring focus:ring-blue-300 hover:bg-sky-700">
              הגדרות
            </button>
          </div>
        </div>
        <div className="flex lg:grid lg:place-items-center md:grid md:place-items-center ">
          <div className="hidden w-full mt-10 md:block md:w-11/12 lg:w-8/12" dir="rtl">
            {table ? (
              <div className="text-xl">
                <div className="grid grid-cols-6 font-bold">
                  <div className="p-2 border-b wrap">
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
              <h3 className="text-lg text-center">לחץ "הכן סידור" ע"מ ליצור סידור עבודה חדש.</h3>
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
            className="px-4 py-3 text-lg font-semibold text-white rounded-full bg-sky-600 focus:outline-none focus:ring focus:ring-blue-300 hover:bg-sky-700"
          >
            הכן סידור {table && ' מחדש'} ⌘
          </button>
        </form>

        {table && (
          <form onSubmit={uploadSchedule} className="flex justify-center mt-5 mb-20">
            <div className="grid place-items-center">
              {button && (
                <button
                  type="submit"
                  className="px-4 py-3 text-lg font-semibold text-white bg-green-600 rounded-full focus:outline-none focus:ring focus:ring-green-300 hover:bg-green-700"
                >
                  העלה סידור
                </button>
              )}
              {!button && (
                <button
                  className="px-4 py-3 text-lg font-semibold text-white bg-gray-600 rounded-full focus:ring hover:cursor-no-drop"
                  disabled
                >
                  העלה סידור
                </button>
              )}
              {status && <Msg bolded={status.bolded} msg={status.msg} OK={status.OK} />}
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default Schedule;
