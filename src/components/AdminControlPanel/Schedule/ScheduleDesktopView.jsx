import React, { Fragment } from 'react';

export default function ScheduleDesktopView({ table, datesArr }) {
  return (
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
                        <div
                          className="whitespace-nowrap odd:bg-white even:bg-slate-50"
                          key={employee._id}
                        >
                          <p key={employee._id}>{employee.username}</p>
                        </div>
                      );
                    })}
                  {table &&
                    table[i].middle.map((employee) => {
                      return (
                        <div
                          className="whitespace-nowrap odd:bg-white even:bg-slate-50"
                          key={employee._id}
                        >
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
                        <div
                          className="whitespace-nowrap divide-y odd:bg-white even:bg-slate-50"
                          key={employee._id}
                        >
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
  );
}
