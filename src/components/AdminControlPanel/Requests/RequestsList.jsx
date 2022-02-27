import { useEffect } from 'react';
import { useUserContext } from '../../useUserContext';
import { useUsersContext } from './useUsersContext';
import axios from 'axios';
import RequestsListTableRow from './RequestsListTableRow';

export default function RequestsList() {
  const { user } = useUserContext(); // current logged in user
  const { users, refreshAllUsers } = useUsersContext(); // all users
  const { username } = user;

  useEffect(() => {
    !users && refreshAllUsers();
  }, []);

  const toggleStatus = async (e, employeeID, dateID) => {
    e.preventDefault();
    const response = await axios.post('/toggle-request-status', {
      dateID,
      employeeID,
      approverUsername: username,
    });
    console.log(response.data);
  };

  return (
    <>
      <div className="mx-auto mt-5 md:w-10/12 lg:w-11/12">
        <div className="border rounded-lg pb-6 border-gray-200">
          <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
            <p className="text-lg lg:text-xl font-semibold leading-tight text-gray-800">
              ניהול בקשות
            </p>
            <div className="flex cursor-pointer items-center justify-center px-3 ml-1 py-2.5 border rounded border-gray-100">
              <p className="text-xs md:text-sm leading-none text-gray-600">סנן לפי: חדש</p>
            </div>
          </div>
          <div className="px-4 pt-4">
            <table className="w-full">
              <tbody>
                {users &&
                  users.map((employee) => {
                    return employee.blockedDates.map((date) => {
                      return (
                        <RequestsListTableRow
                          key={date._id}
                          name={employee.username}
                          date={date.date}
                          status={date.approved}
                          onClick={async (e) => {
                            await toggleStatus(e, employee._id, date._id);
                            await refreshAllUsers();
                          }}
                        />
                      );
                    });
                  })}
                {/* <p>{JSON.stringify(users)}</p> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
