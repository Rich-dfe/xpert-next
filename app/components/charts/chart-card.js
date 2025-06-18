const ChartCard = (props) => {
  return (
    <div className="flex flex-col rounded overflow-hidden bg-gray-200 px-6 py-4">
      {props.children}
    </div>
  );
};

export default ChartCard;