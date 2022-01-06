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

  let dayTableRow = [];
  const daysAhead = 14;

  for (let i = 0; i < daysAhead; i++) {
    const iteratingDate = dayjs(today).add(i, 'day');

    dayTableRow.push(
      <tr key={i}>
        <th className="py-5 border">{iteratingDate.format('D.M')}</th>
        <td className="py-5 border">זמין</td>
      </tr>
    );
  }

  const handleRow = (row) => {
    return row;
  };

  return (
    <>
      <div className="text-4xl w-5/6 lg:w-4/6 text-center pt-10">
        <div className="pb-8">
          <p className="underline underline-offset-4 font-semibold">
            {currentDate} - {dayName}
          </p>
        </div>
        <form>
          <table className="w-full border">
            <tbody>{dayTableRow.map((row) => handleRow(row))}</tbody>
          </table>
          <button className="rounded-full bg-blue-500 p-2 text-3xl m-10 font-medium " type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Days;
