const Button = ({ value }) => {
  return (
    <div className="flex place-content-around">
      <button className="group [transform:translateZ(0)] px-5 py-3 rounded-lg overflow-hidden bg-gray-300 relative border-b-gray-400 border-b-4 active:border-b-0 active:scale-95 before:absolute before:bg-green-600 before:top-1/2 before:left-1/2 before:h-8 before:w-8 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500">
        <span className="relative z-0 text-2xl text-black group-hover:text-gray-200 transition ease-in-out duration-500">{value}</span>
      </button>
    </div>
  );
};

export default Button;
