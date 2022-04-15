import { useEffect } from 'react';
import { useUserContext } from '../../useUserContext';
import { useUsersContext } from '../useUsersContext';
import axios from 'axios';
import RequestsListTableRow from './RequestsListTableRow';
import { Button, Collapse } from '@mantine/core';
import { parse, isAfter } from 'date-fns';

export default function RequestsList() {
  const { user } = useUserContext(); // current logged in user
  const { users, refreshAllUsers } = useUsersContext(); // all users
  const [opened, setOpen] = useState(false);
  const { username } = user;

  useEffect(() => {
    !users && refreshAllUsers();
  }, []);

  const toggleStatus = async (e, employeeID, dateID) => {
    e.preventDefault();
    await axios.post('/toggle-request-status', {
      dateID,
      employeeID,
      approverUsername: username,
    });
  };

  const blockRequests = (user, date, functional = false) => {
    if (functional) {
      return (
        <RequestsListTableRow
          key={date._id}
          name={user.username}
          comment={date.comment}
          date={date.date}
          status={date.approved}
          onClick={async (e) => {
            await toggleStatus(e, user._id, date._id);
            await refreshAllUsers();
          }}
        />
      );
    } else {
      return (
        <RequestsListTableRow
          key={date._id}
          name={user.username}
          comment={date.comment}
          date={date.date}
          status={date.approved}
        />
      );
    }
  };

  return (
    <>
      <div className="mx-auto mt-5 md:w-10/12 lg:w-11/12">
        <div className="pb-6 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            <p className="text-lg font-semibold leading-tight text-gray-800 lg:text-xl">
              ניהול בקשות
            </p>
            {/* <div className="flex cursor-pointer items-center justify-center px-3 ml-1 py-2.5 border rounded border-gray-100">
              <p className="text-xs leading-none text-gray-600 md:text-sm">סנן לפי: חדש</p>
            </div> */}
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
                          comment={date.comment}
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
            {showAllRequests ? (
              <div className="flex justify-center mt-5">
                <Button className="text-lg bg-gray-600" onClick={() => setOpen((o) => !o)}>
                  ראה הכל
                </Button>
              </div>
            ) : null}
            <Collapse in={opened}>
              <table className="w-full mt-2">
                <tbody>
                  {users
                    ? users.map((user) =>
                        user.blockedDates.map((date) => blockRequests(user, date))
                      )
                    : null}
                </tbody>
              </table>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
}
