const Msg = ({ bolded, msg, OK }) => {
  return (
    <>
      <div
        dir="rtl"
        className={
          OK
            ? `bg-green-100 border border-green-400 text-green-700 my-3 px-4 py-3 rounded relative`
            : `bg-red-100 border border-red-400 text-red-700 my-3 px-4 py-3 rounded relative`
        }
      >
        <strong className="font-bold">{bolded}</strong>
        <span className="block sm:inline mr-3">{msg}</span>
      </div>
    </>
  );
};

export default Msg;
