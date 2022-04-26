import { format } from 'date-fns';
import he from 'date-fns/locale/he';

export default function MobileView({ table, getDayHebrew, datesArr }) {
  const formatDay = (date) => {
    return format(date, 'd LLLL', { locale: he });
  };

  return (
    <div className="table w-full md:hidden after:mt-10" dir="rtl">
      {table ? (
        datesArr.map((e, i) => {
          return (
            <div key={i} className="w-7/12 mx-auto text-3xl my-14">
              <div className="font-bold" key={i}>
                <div className="border-b-2" key={i}>
                  {getDayHebrew(datesArr[i])}{' '}
                  <span className="block text-lg font-normal break-words">
                    {formatDay(datesArr[i])}
                  </span>
                </div>
              </div>
              {table &&
                table[i].map((employee, employeeIndex) => {
                  if (table[i].length - 2 <= employeeIndex && table[i].length > 1) {
                    return (
                      <div className="mobileview__employee" key={employee._id}>
                        <p key={employee._id}>{employee.username}</p>
                        <p className="mt-auto mr-1 text-sm">ערב</p>
                      </div>
                    );
                  } else if (table[i].length - 4 <= employeeIndex && table[i].length > 2) {
                    return (
                      <div className="mobileview__employee" key={employee._id}>
                        <p key={employee._id}>{employee.username}</p>
                        <p className="mt-auto mr-1 text-sm">אמצע</p>
                      </div>
                    );
                  } else {
                    return (
                      <div className="mobileview__employee" key={employee._id}>
                        <p key={employee._id}>{employee.username}</p>
                      </div>
                    );
                  }
                })}
              {/* <span className="text-xs font-semibold"> (אמצע)</span> */}
            </div>
          );
        })
      ) : (
        <h1 className="text-2xl font-medium text-center my-28 text-slate-800">לא פורסם סידור</h1>
      )}
    </div>
  );
}
