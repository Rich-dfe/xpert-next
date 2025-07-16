import FormCard from "../Form-card";
import FormStrip from "../Form-strip";
import InfoCard from "../Info-card";
import Image from "next/image";
import MapImg from "@/public/google-map.png";
import { useMemo } from "react";
import Map from "../map";

function MapBox({coords,id, logger_name}){
    return(
    <>
    <FormCard>
    <FormStrip text="Location" />
    <Map coords={coords} id={id} logger_name={logger_name}/>
        {/* <Image className="h-100" src={MapImg} alt="Your Company" /> */}
        <div className="flex justify-end text-blue-100 mt-3">
            {coords[0]}° {coords[1]}°
        </div>
    </FormCard>
    </>
    )
}

export default MapBox;