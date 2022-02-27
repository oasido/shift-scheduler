import { useState, useEffect } from 'react';
import { useUserContext } from '../../useUserContext';
import axios from 'axios';
import RequestsListTableRow from './RequestsListTableRow';

export default function RequestsList() {
  const { user } = useUserContext();
  const { username } = user;
  const [employees, setEmployees] = useState(null);
  const [table, setTable] = useState(null);

  useEffect(() => {
    axios.get('/getUsers').then((response) => setEmployees(response.data));
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

  const iterateTable = async () => {
    const returnedTable =
      employees &&
      employees.map((employee) => {
        return employee.blockedDates.map((date) => {
          return (
            <RequestsListTableRow
              key={date._id}
              name={employee.username}
              date={date.date}
              status={date.approved}
              onClick={(e) => {
                toggleStatus(e, employee._id, date._id);
                iterateTable();
              }}
            />
          );
        });
      });
    setTable(returnedTable);
  };

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
              <tbody>{table && table}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
