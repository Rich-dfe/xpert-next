import Image from "next/image";
import logoImg from "@/public/xpert-logo.png";
import { Bars3Icon, BarsArrowUpIcon } from "@heroicons/react/24/solid";

const BrandStrip = (props) => {
  return (
    <>
    <div className="flex pl-4 sm:justify-center bg-gray-800 pd items-center gap-1">
        <Image className="h-8 w-auto" src={logoImg} alt="Your Company" />
        <div className="mr-auto sm:mx-0 text-3xl p-2 text-gray-300">Dataflow Xpert</div>
    </div>
    
    </>
  );
};

export default BrandStrip;
