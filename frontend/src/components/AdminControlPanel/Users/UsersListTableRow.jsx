import { useState } from 'react';
import { useUsersContext } from './../useUsersContext';
import UserInfoModal from './UserInfoModal';

const RequestListTableRow = ({ user, onClick }) => {
  const { refreshAllUsers } = useUsersContext();
  const [modalData, setModalData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [requestStatus, setReqStatus] = useState(null);

  const openModal = async () => {
    setModalData(user);
    setIsOpen(true);
  };

  const closeModal = async () => {
    setIsOpen(false);
    setModalData(null);
    setReqStatus(null);
    refreshAllUsers();
  };

  return (
    <>
      <tr className="hover:bg-slate-100">
        <td>
          <div className="flex items-center justify-between">
            <div className="pl-3">
              <div className="flex items-center text-lg leading-none">
                <p className="font-semibold text-gray-800">{user.username}</p>
              </div>
            </div>
            <UserInfoModal
              user={user}
              modalData={modalData}
              setModalData={setModalData}
              isOpen={isOpen}
              closeModal={closeModal}
              requestStatus={requestStatus}
              setReqStatus={setReqStatus}
            />
          </div>
        </td>
        <td className="w-1/12">
          <div>
            <button
              onClick={openModal}
              className="flex items-center justify-center px-2 py-3 mt-2 bg-gray-300 rounded-full"
            >
              <p className="text-base leading-3 text-gray-700">עריכה</p>
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default RequestListTableRow;
