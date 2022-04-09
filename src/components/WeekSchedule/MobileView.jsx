import { format } from 'date-fns';
import he from 'date-fns/locale/he';
import { HashLoader } from 'react-spinners';

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
              {table[i].map((employee) => {
                return (
                  <div key={employee._id} className="mt-1 text-xl font-semibold">
                    <p key={employee._id}>{employee.username}</p>
                  </div>
                );
              })}
              {/* <span className="text-xs font-semibold"> (אמצע)</span> */}
            </div>
          );
        })
      ) : (
        <>
          <h3 className="text-lg text-center">טוען סידור...</h3>
          <div className="grid place-items-center">
            <HashLoader className="content-center" size={100} />
          </div>
        </>
      )}
    </div>
  );
}
