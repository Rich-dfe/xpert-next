import FormCard from "../Form-card";
import FormStrip from "../Form-strip";
import InfoCard from "../Info-card";
import Image from "next/image";
import MapImg from "@/public/google-map.png";

function MapBox(){
    return(
    <>
    <FormCard>
    <FormStrip text="Location" />
        <Image className="h-100" src={MapImg} alt="Your Company" />
        <div className="flex justify-end text-blue-100 mt-3">
            172.344° 43.567°
        </div>
    </FormCard>
    </>
    )
}

export default MapBox;