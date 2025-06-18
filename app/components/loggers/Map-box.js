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
    <InfoCard>
        <Image className="h-100" src={MapImg} alt="Your Company" />
    </InfoCard>
    </FormCard>
    </>
    )
}

export default MapBox;