import React from 'react';

export default function RequestsList() {
  return (
    <>
      <div className="mx-auto w-5/6 mt-5">
        <div className="border rounded-lg pb-6 border-gray-200">
          <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
            <p className="text-lg lg:text-xl font-semibold leading-tight text-gray-800">ניהול בקשות</p>
            <div className="flex cursor-pointer items-center justify-center px-3 ml-1 py-2.5 border rounded border-gray-100">
              <p className="text-xs md:text-sm leading-none text-gray-600">סנן לפי: חדש</p>
            </div>
          </div>
          <div className="px-6 pt-6">
            <table className="w-full whitespace-nowrap">
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center">
                      <div className="pl-3">
                        <div className="flex items-center text-sm leading-none">
                          <p className="font-semibold text-gray-800">פלוני אלמוני</p>
                        </div>
                        <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">10.10.1111</p>
                      </div>
                    </div>
                  </td>
                  <td className="w-1/3 lg:w-1/6">
                    <div>
                      <div className="flex items-center justify-center px-2 py-2 mt-2 bg-green-200 rounded-full">
                        <p className="text-xs leading-3 text-green-700">מאושר</p>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="pt-6">
                    <div className="flex items-center">
                      <div className="pl-3">
                        <div className="flex items-center text-sm leading-none">
                          <p className="font-semibold text-gray-800">חוטם חוטמן</p>
                        </div>
                        <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">10.10.1111</p>
                      </div>
                    </div>
                  </td>
                  <td className="w-1/3 lg:w-1/6">
                    <div>
                      <div className="flex items-center justify-center px-2 py-2 mt-2 bg-yellow-200 rounded-full">
                        <p className="text-xs leading-3 text-yellow-700">בהמתנה</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
