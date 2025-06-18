const FormCard = (props) => {
  return (
    <div className="rounded overflow-hidden shadow-2xl/20  bg-gray-800 px-6 mx-6 py-4 h-full">
      {props.children}
    </div>
  );
};

export default FormCard;