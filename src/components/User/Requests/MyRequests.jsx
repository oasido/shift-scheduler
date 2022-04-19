import { useUserContext } from '../../useUserContext';
import { useNavigate } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import Navbar from '../../Navbar';
import RequestList from './RequestsList';

const MyRequests = () => {
  const { user } = useUserContext();

  let navigate = useNavigate();

  switch (true) {
    case !user:
      return (
        <>
          <div className="grid w-screen h-screen place-items-center">
            <HashLoader className="content-center" size={100} />
            <h3>Loading, please wait...</h3>
          </div>
        </>
      );
    case user && user.isAuthenticated === false:
      navigate('/login');
      break;
    default:
      break;
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="grid mt-5 place-items-center" dir="rtl">
          <div className="w-11/12 md:w-5/6 lg:w-5/6">
            <h1 className="text-3xl font-semibold">בקשות ואילוצים</h1>
            <RequestList />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyRequests;
