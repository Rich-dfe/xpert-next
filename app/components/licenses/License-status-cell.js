const LicenseStatusCell = ({getValue, row, column, table}) => {
  const status = getValue();
  let divClass = "text-black p-1";

  if (status === "Valid") {
    divClass += " bg-green-400";
  } else if (status === "Expired") {
    divClass += " bg-red-400";
  } else if (status === "Attention") {
    divClass += " bg-orange-400";
  }

  return (
    <>
      <div className={divClass}>{status}</div>
      <div className=""></div>
      {/* <div>{isVisible ? 'Hide List' : 'Show List'}</div> */}
    </>
  );
};

export default LicenseStatusCell;
