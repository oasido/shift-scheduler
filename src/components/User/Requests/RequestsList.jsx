import { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import RequestsListTableRow from './RequestsListTableRow';

export default function RequestsList() {
  const user = useContext(UserContext);
  const [blockedDates, setBlockedDates] = useState(user.blockedDates);

  return (
    <>
      <div className="mx-auto mt-5 md:w-10/12 lg:w-11/12">
        <div className="border rounded-lg pb-6 border-gray-200">
          <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
            <p className="text-lg lg:text-xl font-semibold leading-tight text-gray-800">
              הבקשות שלי
            </p>
            <div className="flex cursor-pointer items-center justify-center px-3 ml-1 py-2.5 border rounded border-gray-100">
              <p className="text-xs md:text-sm leading-none text-gray-600">סנן לפי: חדש</p>
            </div>
          </div>
          <div className="px-4 pt-4">
            <table className="w-full">
              <tbody>
                {user.blockedDates.map((date) => {
                  return (
                    <RequestsListTableRow
                      key={date._id}
                      comment={date.comment}
                      date={date.date}
                      status={date.approved}
                      dateID={date._id}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
