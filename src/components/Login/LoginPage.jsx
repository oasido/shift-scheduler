const LoginPage = () => {
  return (
    <>
      <section className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="max-w-md w-full bg-gray-900 rounded p-6 space-y-4">
          <div className="mb-4" dir="rtl">
            <p className="text-gray-400">מרחבא!</p>
            <h2 className="text-xl font-bold text-white">התחבר לפוקסיט</h2>
          </div>
          <div>
            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Email" />
          </div>
          <div>
            <input className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600" type="text" placeholder="Password" />
          </div>
          <div>
            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded text-sm font-bold text-gray-50 transition duration-200">התחבר</button>
          </div>

          <div className="flex justify-end text-white">הרשם</div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
