import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './../Navbar';
import HashLoader from 'react-spinners/HashLoader';
import { useUserContext } from './../useUserContext';
import { format, addDays, eachDayOfInterval, nextSunday } from 'date-fns';
import he from 'date-fns/locale/he';
import DesktopView from './DesktopView';
import MobileView from './MobileView';
import axios from 'axios';

const WeekSchedule = () => {
  const { user } = useUserContext();
  const [datesArr, setDatesArr] = useState(null);
  const [table, setTable] = useState(null);

  useEffect(() => {
    const response = axios.get('/getSchedule');
    response.then((res) => {
      setTable(res.data);
    });

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
    case user && user.isAuthenticated === true:
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
          <div className="w-11/12 lg:w-5/6">
            <h1 className="text-3xl font-semibold">סידור עבודה נוכחי</h1>
            <h3>
              {datesArr && formatDay(datesArr[0])} - {datesArr && formatDay(datesArr[5])}
            </h3>
            <div>
              <div className="flex lg:grid lg:place-items-center md:grid md:place-items-center ">
                <div className="md:table hidden w-full mt-10 md:w-11/12 lg:w-9/12" dir="rtl">
                  <div className="table-header-group text-xl">
                    <div className="table-row font-bold">
                      <div className="wrap table-cell p-2 border-b">
                        ראשון
                        <span className="block text-sm font-normal break-words">
                          {datesArr && formatDay(datesArr[0])}
                        </span>
                      </div>
                      <div className="table-cell p-2 border-b">
                        שני{' '}
                        <span className="block text-sm font-normal">
                          {datesArr && formatDay(datesArr[1])}
                        </span>
                      </div>
                      <div className="table-cell p-2 border-b">
                        שלישי
                        <span className="block text-sm font-normal">
                          {datesArr && formatDay(datesArr[2])}
                        </span>
                      </div>
                      <div className="table-cell p-2 border-b">
                        רביעי
                        <span className="block text-sm font-normal">
                          {datesArr && formatDay(datesArr[3])}
                        </span>
                      </div>
                      <div className="table-cell p-2 border-b">
                        חמישי
                        <span className="block text-sm font-normal">
                          {datesArr && formatDay(datesArr[4])}
                        </span>
                      </div>
                      <div className="table-cell p-2 border-b">
                        שישי
                        <span className="block text-sm font-normal">
                          {datesArr && formatDay(datesArr[5])}
                        </span>
                      </div>
                    </div>
                  </div>

                  <DesktopView table={table} datesArr={datesArr} />
                </div>

                <MobileView
                  table={table}
                  getDayHebrew={getDayHebrew}
                  datesArr={datesArr}
                  formatDay={formatDay}
                />
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeekSchedule;
