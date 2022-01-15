const Error = ({ bolded, msg }) => {
  return (
    <>
      <div dir="rtl" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">{bolded}</strong>
        <span className="block sm:inline mr-3">{msg}</span>
      </div>
    </>
  );
};

export default Error;
