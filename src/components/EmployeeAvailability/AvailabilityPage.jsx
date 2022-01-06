import 'react-day-picker/style.css';
import DateInput from './DateInput.tsx';
import Table from './Table';

const AvailabilityPage = () => {
  return (
    <>
      <DateInput className="scale-[1.15] m-10 md:scale-[1.35] md:m-20 " />
      <Table />
    </>
  );
};

export default AvailabilityPage;
