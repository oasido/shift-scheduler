import { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import he from 'date-fns/locale/he';
import 'react-day-picker/style.css';
import DateInput from './DateInput.tsx';
import Table from './Table';
import Button from './Button';

const AvailabilityPage = () => {
  const [selected, setSelected] = useState(null);

  const today = new Date();

  let footer = 'יש לבחור תאריך';
  if (selected) {
    footer = `${format(selected, 'EEEE, d LLLL yyyy', { locale: he })}.`;
    console.log(selected);
  }

  let props = {
    selected,
    setSelected,
    footer,
    today,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/request', { selected });
  };

  return (
    <div className="flex justify-center" dir="rtl">
      <form onSubmit={handleSubmit}>
        <DateInput {...props} />
        <Button type="submit" value="שלח בקשה" />
      </form>
      {/* <Table /> */}
    </div>
  );
};

export default AvailabilityPage;
