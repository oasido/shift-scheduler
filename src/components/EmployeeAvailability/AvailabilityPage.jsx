import 'react-day-picker/style.css';
import DateInput from './DateInput.tsx';
import Table from './Table';

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
  return (
    <>
      <DateInput className="scale-[1.15] m-10 md:scale-[1.35] md:m-20 " />
      <Table />
    </>
  );
};

export default AvailabilityPage;
