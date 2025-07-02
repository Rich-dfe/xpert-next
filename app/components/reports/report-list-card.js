const ReportCard = (props) => {
  return (
    <div className="flex flex-col rounded rounded-b-sm overflow-hidden cursor-pointer bg-gray-400 hover:bg-green-300 px-6 py-1 mb-1">
      {props.children}
    </div>
  );
};

export default ReportCard;