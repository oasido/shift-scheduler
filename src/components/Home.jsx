import Navbar from './Navbar';
import Days from './EmployeeAvailability/Days';
import AvailabilityPage from './EmployeeAvailability/AvailabilityPage';

const Home = () => {
  return (
    <>
      <div className="content" dir="rtl">
        <Navbar />
        <div className="grid place-items-center ">
          {/* <Days /> */}
          <AvailabilityPage />
        </div>
      </div>
    </>
  );
};

export default Home;
