import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, addDays, eachDayOfInterval, nextSunday } from 'date-fns';
import he from 'date-fns/locale/he';
import 'react-day-picker/style.css';
import chunk from 'lodash/chunk';
import sampleSize from 'lodash/sampleSize';
import ScheduleDesktopView from './ScheduleDesktopView';
import ScheduleMobileView from './ScheduleMobileView';
import { useUsersContext } from '../useUsersContext';
import _ from 'lodash';

const Schedule = () => {
  const { users, refreshAllUsers } = useUsersContext();

  // const [employees, setEmployees] = useState(null);
  const [datesArr, setDatesArr] = useState(null);
  const [table, setTable] = useState(null);

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

    const schedule = [];

    for (let i = 0; i < datesArr.length; i++) {
      const morningShift = [...users];
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

      const newShift = new Shift(i, morningShift, middleShift, eveningShift);
      schedule[i] = newShift;
    }
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

            <ScheduleDesktopView table={table} datesArr={datesArr} />
          </div>

          <ScheduleMobileView
            table={table}
            datesArr={datesArr}
            getDayHebrew={getDayHebrew}
            formatDay={formatDay}
          />
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

export default Schedule;
