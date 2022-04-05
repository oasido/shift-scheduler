import axios from 'axios';
import { isFriday } from 'date-fns';
import { Fragment, useEffect, useState } from 'react';

export default function ScheduleDesktopView({ datesArr }) {
  const [table, setTable] = useState(null);

  useEffect(() => {
    const response = axios.get('/getSchedule');
    response.then((res) => {
      setTable(res.data);
    });
  }, []);

  return (
    <div className="table-row-group">
      <div className="table-row font-semibold text-lg">
        {datesArr &&
          datesArr.map((e, i) => {
            return (
              <Fragment key={i}>
                <div className="table-cell" key={i}>
                  {table &&
                    table[i].map((employee) => {
                      return (
                        <div
                          className="whitespace-nowrap odd:bg-white even:bg-slate-50"
                          key={employee._id}
                        >
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
  );
}
