import { useUserContext } from '../../useUserContext';
import RequestsListTableRow from './RequestsListTableRow';
import { parse, isAfter } from 'date-fns';
import { useState } from 'react';
import { Button, Collapse } from '@mantine/core';

export default function RequestsList() {
  const { user } = useUserContext();
  const [opened, setOpen] = useState(false);

  const blockedDates = [...user.blockedDates];

  blockedDates.forEach((date, i) => {
    const parsedDate = parse(date.date, 'dd-MM-yyyy', new Date());

    // chore: add 1 day minus for the current day to show
    if (!isAfter(parsedDate, new Date())) {
      delete blockedDates[i];
    }
  });

  return (
    <>
      <div className="mx-auto mt-5 md:w-5/6 lg:w-4/6">
        <div className="pb-6 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            <p className="text-lg font-semibold leading-tight text-gray-800 lg:text-xl">
              הבקשות שלי
            </p>
          </div>
          <div className="px-4 pt-4">
            {blockedDates.length !== 0 && (
              <table className="w-full">
                <tbody>
                  {blockedDates
                    .slice(0)
                    .reverse()
                    .map((date) => {
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
            )}

            {blockedDates.length > 0 ? (
              <div className="flex justify-center mt-5">
                <Button className="text-lg bg-gray-600" onClick={() => setOpen((o) => !o)}>
                  ראה הכל
                </Button>
              </div>
            ) : (
              <h1 className="text-2xl font-medium text-center my-28 text-slate-800">
                אין בקשות לחסימת תאריכים
              </h1>
            )}
            <Collapse in={opened}>
              {/* old  */}
              <table className="w-full mt-2">
                <tbody>
                  {user.blockedDates
                    .slice(0)
                    .reverse()
                    .map((date) => {
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
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
}
