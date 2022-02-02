import React from 'react';

export default function RequestsList() {
  return (
    <>
      <div className="w-full max-w-2xl px-4">
        <div className="border rounded-lg pb-6 border-gray-200">
          <div className="flex items-center border-b border-gray-200 justify-between px-6 py-3">
            <p className="text-sm lg:text-xl font-semibold leading-tight text-gray-800">Product Sales</p>
            <div className="flex cursor-pointer items-center justify-center px-3 py-2.5 border rounded border-gray-100">
              <p className="text-xs md:text-sm leading-none text-gray-600">Filter by: Latest</p>
            </div>
          </div>
          <div className="px-6 pt-6 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center">
                      <div className="bg-gray-100 rounded-sm p-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                          <path
                            d="M13.5613 8.42567C12.5393 8.42567 10.9573 7.26367 9.29134 7.30567C7.09334 7.33367 5.07734 8.57967 3.94334 10.5537C1.66134 14.5157 3.35534 20.3677 5.58134 23.5877C6.67334 25.1557 7.96134 26.9197 9.66934 26.8637C11.3073 26.7937 11.9233 25.7997 13.9113 25.7997C15.8853 25.7997 16.4453 26.8637 18.1813 26.8217C19.9453 26.7937 21.0653 25.2257 22.1433 23.6437C23.3893 21.8237 23.9073 20.0597 23.9353 19.9617C23.8933 19.9477 20.5053 18.6457 20.4633 14.7257C20.4353 11.4497 23.1373 9.88167 23.2633 9.81167C21.7233 7.55767 19.3573 7.30567 18.5313 7.24967C16.3753 7.08167 14.5693 8.42567 13.5613 8.42567ZM17.2013 5.12167C18.1113 4.02967 18.7133 2.50367 18.5453 0.991669C17.2433 1.04767 15.6753 1.85967 14.7373 2.95167C13.8973 3.91767 13.1693 5.47167 13.3653 6.95567C14.8073 7.06767 16.2913 6.21367 17.2013 5.12167Z"
                            fill="#6B7280"
                          />
                        </svg>
                      </div>
                      <div className="pl-3">
                        <div className="flex items-center text-sm leading-none">
                          <p className="font-semibold text-gray-800">Apple MacBook Pro 2020</p>
                          <p className="text-blue-500 ml-3">(ID 879-10-940)</p>
                        </div>
                        <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">15’5. Core i5. FHD. Integrated graphics</p>
                      </div>
                    </div>
                  </td>
                  <td className="pl-16">
                    <div>
                      <p className="text-sm font-semibold leading-none text-right text-gray-800">$2200</p>
                      <div className="flex items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                        <p className="text-xs leading-3 text-green-700">Shipped</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-gray-100 rounded-sm p-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                          <path
                            d="M13.5613 8.42567C12.5393 8.42567 10.9573 7.26367 9.29134 7.30567C7.09334 7.33367 5.07734 8.57967 3.94334 10.5537C1.66134 14.5157 3.35534 20.3677 5.58134 23.5877C6.67334 25.1557 7.96134 26.9197 9.66934 26.8637C11.3073 26.7937 11.9233 25.7997 13.9113 25.7997C15.8853 25.7997 16.4453 26.8637 18.1813 26.8217C19.9453 26.7937 21.0653 25.2257 22.1433 23.6437C23.3893 21.8237 23.9073 20.0597 23.9353 19.9617C23.8933 19.9477 20.5053 18.6457 20.4633 14.7257C20.4353 11.4497 23.1373 9.88167 23.2633 9.81167C21.7233 7.55767 19.3573 7.30567 18.5313 7.24967C16.3753 7.08167 14.5693 8.42567 13.5613 8.42567ZM17.2013 5.12167C18.1113 4.02967 18.7133 2.50367 18.5453 0.991669C17.2433 1.04767 15.6753 1.85967 14.7373 2.95167C13.8973 3.91767 13.1693 5.47167 13.3653 6.95567C14.8073 7.06767 16.2913 6.21367 17.2013 5.12167Z"
                            fill="#6B7280"
                          />
                        </svg>
                      </div>
                      <div className="pl-3">
                        <div className="flex items-center text-sm leading-none">
                          <p className="font-semibold text-gray-800">Apple MacBook Pro 2020</p>
                          <p className="text-blue-500 ml-3">(ID 879-10-940)</p>
                        </div>
                        <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">15’5. Core i5. FHD. Integrated graphics</p>
                      </div>
                    </div>
                  </td>
                  <td className="pl-16 pt-6">
                    <div>
                      <p className="text-sm font-semibold leading-none text-right text-gray-800">$2200</p>
                      <div className="flex items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                        <p className="text-xs leading-3 text-green-700">Shipped</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-gray-100 rounded-sm p-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                          <path
                            d="M3.57465 8.76168C4.54532 6.82879 6.03442 5.20394 7.87548 4.06872C9.71655 2.93351 11.8371 2.33266 14 2.33334C17.1441 2.33334 19.7855 3.48834 21.805 5.37251L18.4601 8.71851C17.2503 7.56234 15.7126 6.97318 14 6.97318C10.9608 6.97318 8.38831 9.02651 7.47248 11.7833C7.23915 12.4833 7.10615 13.23 7.10615 14C7.10615 14.77 7.23915 15.5167 7.47248 16.2167C8.38948 18.9747 10.9608 21.0268 14 21.0268C15.5691 21.0268 16.905 20.6127 17.9503 19.9127C18.5563 19.5137 19.0751 18.9959 19.4754 18.3908C19.8756 17.7856 20.149 17.1055 20.279 16.3917H14V11.879H24.9876C25.1253 12.642 25.2 13.4377 25.2 14.2648C25.2 17.8185 23.9283 20.8098 21.721 22.8398C19.7913 24.6225 17.15 25.6667 14 25.6667C12.4677 25.6673 10.9504 25.3659 9.53461 24.7799C8.11887 24.1938 6.83251 23.3344 5.74903 22.251C4.66556 21.1675 3.80622 19.8811 3.22014 18.4654C2.63405 17.0496 2.3327 15.5323 2.33331 14C2.33331 12.117 2.78365 10.3367 3.57465 8.76168Z"
                            fill="#6B7280"
                          />
                        </svg>
                      </div>
                      <div className="pl-3">
                        <div className="flex items-center text-sm leading-none">
                          <p className="font-semibold text-gray-800">Google Pixel 5</p>
                          <p className="text-blue-500 ml-3">(ID 879-10-940)</p>
                        </div>
                        <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">15’5. Core i5. FHD. Integrated graphics</p>
                      </div>
                    </div>
                  </td>
                  <td className="pl-16 pt-6">
                    <div>
                      <p className="text-sm font-semibold leading-none text-right text-gray-800">$2200</p>
                      <div className="flex items-center justify-center px-2 py-1 mt-2 bg-yellow-100 rounded-full">
                        <p className="text-xs leading-3 text-yellow-700">Processing</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="pt-6">
                    <div className="flex items-center">
                      <div className="bg-gray-100 rounded-sm p-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                          <path
                            d="M13.4167 3.5V13.4167H3.5V3.5H13.4167ZM13.4167 24.5H3.5V14.5833H13.4167V24.5ZM14.5833 3.5H24.5V13.4167H14.5833V3.5ZM24.5 14.5833V24.5H14.5833V14.5833H24.5Z"
                            fill="#6B7280"
                          />
                        </svg>
                      </div>
                      <div className="pl-3">
                        <div className="flex items-center text-sm leading-none">
                          <p className="font-semibold text-gray-800">MS Surface 2019</p>
                          <p className="text-blue-500 ml-3">(ID 879-10-940)</p>
                        </div>
                        <p className="text-xs md:text-sm leading-none text-gray-600 mt-2">15’5. Core i5. FHD. Integrated graphics</p>
                      </div>
                    </div>
                  </td>
                  <td className="pl-16 pt-6">
                    <div>
                      <p className="text-sm font-semibold leading-none text-right text-gray-800">$2200</p>
                      <div className="flex items-center justify-center px-2 py-1 mt-2 bg-green-100 rounded-full">
                        <p className="text-xs leading-3 text-green-700">Shipped</p>
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
