import dayjs from 'dayjs';

const Days = () => {
  // get date
  const today = dayjs();
  const currentDate = `${today.get('date') + 1}/${today.get('month') + 1}/${today.get('year')}`;

  const getDayName = (dateString, locales) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locales, { weekday: 'long' });
  };
  const dayName = getDayName(currentDate, 'iw');

  const handleDaysAhead = ({ daysAhead = 0, today, dayName }) => {};

  return (
    <>
      <div className="text-4xl w-5/6 lg:w-4/6 text-center pt-10">
        <div className="pb-8">
          <p className="underline underline-offset-4 font-semibold">
            {currentDate} - {dayName}
          </p>
        </div>
        <table className="w-full border">
          <tbody>
            <tr>
              <th className="py-5 border">1.1</th>
              <td className="py-5 border">זמין</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Days;
