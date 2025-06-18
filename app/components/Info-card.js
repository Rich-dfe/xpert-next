const InfoCard = (props) => {
  return (
    <div className="flex flex-col rounded overflow-hidden bg-gray-300 px-6 py-4">
      {props.children}
    </div>
  );
};

export default InfoCard;