const FormStrip = (props) => {
  return (
    <>
    <div className="flex bg-green-400 pd items-center gap-1 justify-center mb-2 rounded-sm">
        <span className="text-1xl font-semibold p-1 text-gray-700">{props.text}</span>
    </div>
    
    </>
  );
};

export default FormStrip;