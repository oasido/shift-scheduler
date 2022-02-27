import { useState } from 'react';

const RequestListTableRow = ({ name, date, status, onClick }) => {
  const [pendingText, setPendingText] = useState('בהמתנה');
  const [approvedText, setApprovedText] = useState('מאושר');

  const pendingMouseEnter = () => {
    setPendingText('אשר בקשה');
  };

  const pendingMouseLeave = () => {
    setPendingText('בהמתנה');
  };

  const approvedMouseEnter = () => {
    setApprovedText('בטל בקשה');
  };

  const approvedMouseLeave = () => {
    setApprovedText('בהמתנה');
  };

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center">
            <div className="pl-3">
              <div className="flex items-center text-base md:text-lg leading-none">
                <p className="font-semibold text-gray-800">{name}</p>
              </div>
              <p className="text-base md:text-lg leading-none text-gray-600 mt-0 mb-2">{date}</p>
            </div>
          </div>
        </td>
        <td className="w-1/3 lg:w-1/6">
          <div>
            {status && (
              <div
                onClick={onClick}
                className="flex items-center justify-center px-2 py-3 mt-2 bg-green-200 rounded-full hover:cursor-pointer"
                onMouseEnter={approvedMouseEnter}
                onMouseLeave={approvedMouseLeave}
              >
                <p className="text-base leading-3 text-green-700">{approvedText}</p>
              </div>
            )}
            {!status && (
              <div
                onClick={onClick}
                className="flex items-center justify-center px-2 py-3 mt-2 bg-yellow-200 rounded-full hover:cursor-pointer"
                onMouseEnter={pendingMouseEnter}
                onMouseLeave={pendingMouseLeave}
              >
                <p className="text-base leading-3 text-yellow-700">{pendingText}</p>
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default RequestListTableRow;
