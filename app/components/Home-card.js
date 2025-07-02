import Link from "next/link";

const HomeCard = (props) => {
  return (
    <>
    <Link href={props.link}>
    <div className="max-w-sm rounded overflow-hidden shadow-2xl/40  bg-gray-800">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-green-400">{props.product}</div>
        <p className="text-gray-300 text-base">{props.text}</p>
      </div>
      <div className="px-6"><p className="text-gray-200 text-sm font-light">25 x Loggers.</p></div>
      
      <div className="px-6 pt-4 pb-4">
        <button className="bg-blue-500 hover:bg-green-400 text-white hover:text-black text-sm py-1 px-3 rounded-full">
            Select
        </button>
      </div>
    </div>
    </Link>
    </>
  );
};

export default HomeCard;
