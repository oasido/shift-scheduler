const Button = ({ name, color, onClick }) => {
  return (
    <button
      type="button"
      className={`inline-flex justify-center px-4 py-2 mx-1 text-sm font-medium text-${color}-900 bg-${color}-100 border border-transparent rounded-md hover:bg-${color}-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-${color}-500`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
