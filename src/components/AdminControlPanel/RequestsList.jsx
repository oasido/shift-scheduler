import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import RequestsListTableRow from './RequestsListTableRow';

export default function RequestsList({ requests }) {
  const { username } = useContext(UserContext);
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    axios.get('/getUsers').then((response) => setEmployees(response.data));
  }, []);

  return (
    <>
      <div className="mx-auto w-5/6 mt-5">
        <div className="border rounded-lg pb-6 border-gray-200">
          <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
            <p className="text-lg lg:text-xl font-semibold leading-tight text-gray-800">
              ניהול בקשות
            </p>
            <div className="flex cursor-pointer items-center justify-center px-3 ml-1 py-2.5 border rounded border-gray-100">
              <p className="text-xs md:text-sm leading-none text-gray-600">סנן לפי: חדש</p>
            </div>
          </div>
          <div className="px-6 pt-6">
            <table className="w-full whitespace-nowrap">
              <tbody>
                {employees &&
                  employees.map((employee) => {
                    return employee.blockedDates.map((date) => {
                      return (
                        <RequestsListTableRow
                          key={date._id}
                          name={employee.username}
                          date={date.date}
                          status={date.approved}
                          onClick={(e) => toggleStatus(e, employee._id, date._id)}
                        />
                      );
                    });
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
