import { Fragment } from 'react';

export default function DesktopView({ table, datesArr }) {
  return (
    <div className="table-row-group">
      <div className="table-row text-xl font-semibold">
        {datesArr &&
          datesArr.map((e, i) => {
            // TODO: add אמצע OR ערב
            return (
              <Fragment key={i}>
                <div className="table-cell" key={i}>
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
