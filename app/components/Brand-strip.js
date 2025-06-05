import Image from "next/image";
import logoImg from "@/public/xpert-logo.png";

const BrandStrip = (props) => {
  return (
    <>
    <div className="flex bg-gradient-to-b from-gray-700 to-gray-800 pd items-center gap-1 justify-center">
        <Image className="h-8 w-auto" src={logoImg} alt="Your Company" />
        <span className="text-3xl p-2 text-gray-300">Dataflow Xpert</span>
    </div>
    
    </>
  );
};

export default BrandStrip;
