const FormCard = (props) => {
  return (
    <div className="rounded overflow-hidden shadow-2xl/20 bg-gray-800 px-2 py-4 md:px-6 md:mx-6 h-full">
      {props.children}
    </div>
  );
};

export default FormCard;