import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import axios from 'axios';
import { format } from 'date-fns';
import he from 'date-fns/locale/he';
import 'react-day-picker/style.css';
import HashLoader from 'react-spinners/HashLoader';
import { UserContext } from '../UserContext';

const AdminPage = () => {
  const user = useContext(UserContext);
  const [employees, setEmployees] = useState(null);

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

  const handleSchedule = async (e) => {
    e.preventDefault();

    const response = await axios.get('/getUsers');
    setEmployees(response.data);
  };

  return (
    <>
      <Navbar />
      {/* <div className="flex justify-center"> */}
      <div className="overflow-x-auto">
        <form onSubmit={handleSchedule}>
          <button type="submit" className="btn btn-lg">
            Generate
          </button>
        </form>
        {/* <table className="table w-full table-zebra" dir="rtl">
          <thead>
            <tr>
              <th>ראשון</th>
              <th>שני</th>
              <th>שלישי</th>
              <th>רביעי</th>
              <th>חמישי</th>
              <th>שישי</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>אופק</td>
              <td>אופק</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>1</td>
            </tr>
            <tr>
              <td>אופק</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>2</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>TOTAL</th>
              <th>TOTAL</th>
              <th>TOTAL</th>
              <th>TOTAL</th>
              <th>TOTAL</th>
              <th>TOTAL</th>
              <th></th>
            </tr>
          </tfoot>
        </table> */}
      </div>
      <form>{/* <button className="btn btn-base">הכן סידור</button> */}</form>
      {/* </div> */}
    </>
  );
};

export default AdminPage;
