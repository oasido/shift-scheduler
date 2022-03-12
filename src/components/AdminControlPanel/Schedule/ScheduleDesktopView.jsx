import { isFriday } from 'date-fns';

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
                          <p
                            onInput={(e) => {
                              const text = e.target.innerText;
                              employee.username = text;
                            }}
                            contentEditable
                            suppressContentEditableWarning={true}
                            key={employee._id}
                          >
                            {employee.username}
                          </p>
                        </div>
                      );
                    })}
                  {table &&
                    !isFriday(datesArr[i]) &&
                    table[i].middle.map((employee) => {
                      return (
                        <div
                          className="whitespace-nowrap odd:bg-white even:bg-slate-50"
                          key={employee._id}
                        >
                          <p
                            onInput={(e) => {
                              const text = e.target.innerText;
                              employee.username = text;
                            }}
                            contentEditable
                            suppressContentEditableWarning={true}
                            className="p-1"
                            key={employee._id}
                          >
                            {employee.username}
                          </p>
                          <span className="font-semibold text-xs"> (אמצע)</span>
                        </div>
                      );
                    })}
                  {table &&
                    !isFriday(datesArr[i]) &&
                    table[i].evening.map((employee) => {
                      return (
                        <div
                          className="whitespace-nowrap divide-y odd:bg-white even:bg-slate-50"
                          key={employee._id}
                        >
                          <p
                            onInput={(e) => {
                              const text = e.target.innerText;
                              employee.username = text;
                            }}
                            contentEditable
                            suppressContentEditableWarning={true}
                            className="p-1"
                            key={employee._id}
                          >
                            {employee.username}
                          </p>
                          <span className="font-semibold text-xs"> (ערב)</span>
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
