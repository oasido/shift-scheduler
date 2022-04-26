import Modal from './RequestInfoModal';
import { parse } from 'date-fns';

const RequestListTableRow = ({ comment, date, status, onClick, dateID }) => {
  const requestDate = parse(date, 'dd-MM-yyyy', new Date());
  const currentDate = new Date();

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center justify-between">
            <div className="pl-3">
              <div className="flex items-center text-lg leading-none">
                {comment && (
                  <p className="font-semibold text-gray-800 whitespace-normal">{comment}</p>
                )}
                {!comment && (
                  <p className="italic font-medium text-gray-800 whitespace-normal">
                    לא הוזנה הערה
                  </p>
                )}
              </div>
              <p className="mt-0 mb-2 text-base text-gray-600 md:text-lg">{date}</p>
            </div>
            {currentDate <= requestDate && !status && <Modal dateID={dateID} />}
          </div>
        </td>
        <td className="w-1/12">
          <div>
            {status && (
              <div
                onClick={onClick}
                className="flex items-center justify-center px-2 py-3 mt-2 bg-green-200 rounded-full"
              >
                <p className="text-base leading-3 text-green-700">מאושר</p>
              </div>
            )}
            {currentDate <= requestDate && !status && (
              <>
                <div
                  onClick={onClick}
                  className="flex items-center justify-center px-2 py-3 mt-2 bg-yellow-200 rounded-full"
                >
                  <p className="text-base leading-3 text-yellow-700">בהמתנה</p>
                </div>
              </>
            )}
            {currentDate > requestDate && !status && (
              <>
                <div
                  onClick={onClick}
                  className="flex items-center justify-center px-2 py-3 mt-2 bg-red-200 rounded-full"
                >
                  <p className="text-base leading-3 text-red-700">לא אושר</p>
                </div>
              </>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

export default RequestListTableRow;
