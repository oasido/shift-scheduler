import Navbar from './Navbar';
import Days from './EmployeeAvailability/Days';

const Home = () => {
  return (
    <>
      <div className="content" dir="rtl">
        <Navbar />
        <div className="grid place-items-center">
          <Days />
        </div>
      </div>
    </>
  );
};

export default Home;
