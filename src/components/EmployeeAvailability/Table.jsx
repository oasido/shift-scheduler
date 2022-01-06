const Table = () => {
  return (
    <>
      <div className="shadow overflow-hidden rounded-lg">
        <table className="min-w-full text-gray-400">
          <thead className="bg-gray-800 uppercase font-medium">
            <tr>
              <th></th>
              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                תאריך
              </th>
              <th scope="col" className="px-6 py-3 text-left tracking-wider">
                סוג
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800">
            <tr className="bg-black bg-opacity-20">
              <td className="p-4">1</td>
              <td className="flex px-6 py-4 whitespace-nowrap">
                <span className="ml-2 font-medium">MI</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">14</td>
            </tr>
            <tr>
              <td className="p-4">2</td>
              <td className="flex px-6 py-4 whitespace-nowrap">
                <span className="ml-2 font-medium">DC</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">14</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
