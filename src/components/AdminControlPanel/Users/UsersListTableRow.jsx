import Modal from './UserInfoModal';

const RequestListTableRow = ({ user, onClick }) => {
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center justify-between">
            <div className="pl-3">
              <div className="flex items-center text-lg leading-none">
                <p className="font-semibold text-gray-800">{user.username}</p>
              </div>
            </div>
            <Modal user={user} />
          </div>
        </td>
        <td className="w-1/12">
          <div>
            <div
              onClick={onClick}
              className="flex items-center justify-center px-2 py-3 mt-2 bg-gray-300 rounded-full"
            >
              <p className="text-base leading-3 text-gray-700">עריכה</p>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default RequestListTableRow;
