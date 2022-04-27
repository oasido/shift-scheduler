import { useEffect } from 'react';
import { useUsersContext } from '../useUsersContext';
import UsersListTableRow from './UsersListTableRow';
import { MdOutlineManageAccounts } from 'react-icons/md';
import CreateUserModal from './CreateUserModal';

export default function RequestsList() {
  const { users, refreshAllUsers } = useUsersContext();

  useEffect(() => {
    refreshAllUsers();
  }, []);

  return (
    <>
      <div className="mx-auto my-5 md:w-5/6 lg:w-4/6">
        <div className="pb-6 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
            {/* <p className="text-lg font-semibold leading-tight text-gray-800 lg:text-xl">משתמשים</p> */}
            <MdOutlineManageAccounts className="text-2xl" />
            <div className="flex">
              <CreateUserModal />
            </div>
          </div>
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
