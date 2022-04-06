import { format } from 'date-fns';
import he from 'date-fns/locale/he';
import { HashLoader } from 'react-spinners';

export default function MobileView({ table, getDayHebrew, datesArr }) {
  const formatDay = (date) => {
    return format(date, 'd LLLL', { locale: he });
  };

  return (
    <div className="table md:hidden w-full after:mt-10" dir="rtl">
      {table ? (
        datesArr.map((e, i) => {
          return (
            <div key={i} className="text-3xl w-7/12 my-14 mx-auto">
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
                  <div key={employee._id} className="font-semibold text-xl mt-1">
                    <p key={employee._id}>{employee.username}</p>
                  </div>
                );
              })}
              {/* <span className="font-semibold text-xs"> (אמצע)</span> */}
            </div>
          );
        })
      ) : (
        <>
          <h3 className="text-center text-lg">טוען סידור...</h3>
          <div className="grid place-items-center">
            <HashLoader className="content-center" size={100} />
          </div>
        </>
      )}
    </div>
  );
}
