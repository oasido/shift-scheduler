import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar';
import 'react-day-picker/style.css';
import HashLoader from 'react-spinners/HashLoader';
import { useUserContext } from '../../useUserContext';
import RequestsList from './RequestsList';
import { UsersContextProvider } from './useUsersContext';

const RequestsPage = () => {
  const { user } = useUserContext();

  let navigate = useNavigate();

  switch (true) {
    case !user:
      return (
        <>
          <div className="w-screen h-screen grid place-items-center">
            <HashLoader className="content-center" size={100} />
            <h3>Loading, please wait...</h3>
          </div>
        </>
      );
    case user && user.admin === false && user.isAuthenticated === true:
      navigate('/');
      break;
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
        <div className="grid place-items-center mt-5" dir="rtl">
          <div className="w-11/12 lg:w-4/6">
            <h1 className="text-3xl font-semibold">בקשות ואילוצים</h1>
            <UsersContextProvider>
              <RequestsList />
            </UsersContextProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestsPage;
