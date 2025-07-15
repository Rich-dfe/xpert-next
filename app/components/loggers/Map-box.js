import FormCard from "../Form-card";
import FormStrip from "../Form-strip";
import InfoCard from "../Info-card";
import Image from "next/image";
import MapImg from "@/public/google-map.png";

function MapBox({lat, lng}){
    return(
    <>
    <FormCard>
    <FormStrip text="Location" />
        <Image className="h-100" src={MapImg} alt="Your Company" />
        <div className="flex justify-end text-blue-100 mt-3">
            {lat}° {lng}°
        </div>
    </FormCard>
    </>
    )
}

export default MapBox;