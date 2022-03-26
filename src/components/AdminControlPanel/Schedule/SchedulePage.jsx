import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import Schedule from './Schedule';
import { useUserContext } from '../../useUserContext';
import { UsersContextProvider } from '../useUsersContext';

const SchedulePage = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

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
      <UsersContextProvider>
        <Schedule />
      </UsersContextProvider>
    </>
  );
};

export default SchedulePage;
