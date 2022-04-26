import { useEffect, useState } from 'react';
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
  const [showAllRequests, setShowAllRequests] = useState(false);
  const { username } = user;

  useEffect(() => {
    !users && refreshAllUsers();
    checkNoRequests();
  }, [users]);

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

  const checkNoRequests = async () => {
    if (users) {
      for (let i = 0; i < users.length; i++) {
        if (users[i].blockedDates.length > 0) {
          setShowAllRequests(true);
          break;
        }
      }
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto my-5 md:w-5/6 lg:w-4/6">
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
                {users
                  ? users.map((user) => {
                      return user.blockedDates.map((date) => {
                        const parsedDate = parse(date.date, 'dd-MM-yyyy', new Date());

                        if (isAfter(parsedDate, new Date())) {
                          const functional = true;
                          return blockRequests(user, date, functional);
                        }
                      });
                    })
                  : null}

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
            {!showAllRequests ? (
              <h1 className="text-2xl font-medium text-center my-28 text-slate-800">
                אין בקשות לחסימת תאריכים
              </h1>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
