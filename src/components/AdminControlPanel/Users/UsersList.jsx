import { useEffect } from 'react';
import { useUserContext } from '../../useUserContext';
import { useUsersContext } from '../useUsersContext';
import UsersListTableRow from './UsersListTableRow';

export default function RequestsList() {
  const { user } = useUserContext();
  const { users, refreshAllUsers } = useUsersContext();

  useEffect(() => {
    refreshAllUsers();
  }, []);

  return (
    <>
      <div className="w-11/12 mx-auto mt-5 md:w-8/12 lg:w-4/6">
        <div className="pb-6 border border-gray-200 rounded-lg">
          {/* <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            <p className="text-lg font-semibold leading-tight text-gray-800 lg:text-xl">
              משתמשים
            </p>
            <div className="flex cursor-pointer items-center justify-center px-3 ml-1 py-2.5 border rounded border-gray-100">
              <p className="text-xs leading-none text-gray-600 md:text-sm">סנן לפי: חדש</p>
            </div>
          </div> */}
          <div className="px-4 pt-4">
            <table className="w-full">
              <tbody>
                {users &&
                  users.map((user) => {
                    return <UsersListTableRow key={user._id} user={user} />;
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
