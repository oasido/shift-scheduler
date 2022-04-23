import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar';
import axios from 'axios';
import { format } from 'date-fns';
import he from 'date-fns/locale/he';
// import 'react-day-picker/style.css';
import DateInput from './DateInput.tsx';
// import Table from './Table';
import BlockRequestButton from './BlockRequestButton';
import HashLoader from 'react-spinners/HashLoader';
import { useUserContext } from '../../useUserContext';
import CommentTextArea from './CommentTextArea';
import Msg from '../../general/Msg';

const AvailabilityPage = () => {
  const { user, refresh } = useUserContext();
  const [requestStatus, setReqStatus] = useState(null);

  let navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const today = new Date();

  let footer = 'יש לבחור תאריך';
  if (selected) {
    footer = `${format(selected, 'EEEE, d LLLL yyyy', { locale: he })}.`;
  }

  let props = {
    selected,
    setSelected,
    footer,
    today,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selected) {
      const date = format(selected, 'dd-MM-yyyy');
      const comment = e.target.comment.value;
      const response = await axios.post('/block-date', { date, comment });

      if (response.data.msg === 'BlockAlreadyRequested') {
        setReqStatus({
          bold: 'שגיאה',
          msg: `כבר נשלחה בקשה לחסימת התאריך הזה`,
          OK: false,
        });
      } else if (response.data.msg === 'BlockRequestSuccess') {
        setReqStatus({
          bold: 'אוקיי!',
          msg: `הבקשה נשלחה בהצלחה`,
          OK: true,
        });
        refresh();
      }
    } else {
      setReqStatus({
        bold: 'שגיאה',
        msg: 'תאריך לא נבחר',
        OK: false,
      });
    }
  };

  if (user && user.isAuthenticated === false) {
    navigate('/login');
  }

  if (!user) {
    return (
      <>
        <div className="grid w-screen h-screen place-items-center">
          <HashLoader className="content-center" size={100} />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center" dir="rtl">
        <form onSubmit={handleSubmit}>
          <DateInput {...props} />
          <CommentTextArea />
          <BlockRequestButton type="submit" />
          {requestStatus && (
            <Msg bolded={requestStatus.bold} msg={requestStatus.msg} OK={requestStatus.OK} />
          )}
        </form>
        {/* <Table /> */}
      </div>
    </>
  );
};

export default AvailabilityPage;
