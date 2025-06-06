const FormCard = (props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-2xl/20  bg-gray-800 px-6 mx-6 py-4">
      {props.children}
    </div>
  );
};

export default FormCard;