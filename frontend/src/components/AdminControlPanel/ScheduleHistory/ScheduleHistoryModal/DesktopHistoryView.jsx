import { Fragment } from 'react';
import { format } from 'date-fns';
import he from 'date-fns/locale/he';

export default function DesktopHistoryView({ table, datesArr }) {
  const formatDay = (date) => {
    return format(date, 'd LLLL', { locale: he });
  };

  return (
    <div className="table-row-group">
      <div className="table-row text-base font-semibold">
        {datesArr &&
          datesArr.map((e, i) => {
            return (
              <Fragment key={i}>
                <div className="table-cell md:text-lg md:px-2 lg:text-lg lg:px-3" key={i}>
                  <p className="text-lg font-bold border-b-2 md:text-lg lg:text-xl">
                    {formatDay(datesArr[i])}
                  </p>
                  {table &&
                    table[i].map((employee, employeeIndex) => {
                      if (table[i].length - 2 <= employeeIndex && table[i].length > 1) {
                        return (
                          <div className="desktopview__employee" key={employee._id}>
                            <p key={employee._id}>{employee.username}</p>
                            <p className="mt-auto mr-1 text-sm">ערב</p>
                          </div>
                        );
                      } else if (table[i].length - 4 <= employeeIndex && table[i].length > 2) {
                        return (
                          <div className="desktopview__employee" key={employee._id}>
                            <p key={employee._id}>{employee.username}</p>
                            <p className="mt-auto mr-1 text-sm">אמצע</p>
                          </div>
                        );
                      } else {
                        return (
                          <div className="desktopview__employee" key={employee._id}>
                            <p key={employee._id}>{employee.username}</p>
                          </div>
                        );
                      }
                    })}
                </div>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
}
