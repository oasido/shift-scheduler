import { isFriday } from 'date-fns';
import { Fragment } from 'react';

export default function DesktopView({ table, datesArr }) {
  return (
    <div className="table-row-group">
      <div className="table-row font-semibold text-lg">
        {datesArr &&
          datesArr.map((e, i) => {
            // TODO: add אמצע OR ערב
            return (
              <Fragment key={i}>
                <div className="table-cell" key={i}>
                  {table &&
                    table[i].map((employee) => {
                      return (
                        <div
                          className="whitespace-nowrap odd:bg-blue-50 even:bg-white"
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
