import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import Image from "next/image";

function NoCalForm({loggerType,header}) {
  return (
    <FormCard>
      <FormStrip text={header} />
      <div className="flex flex-col">
        <div className="flex justify-center text-gray-300">{loggerType}</div>
        <div className="flex justify-center animate-pulse">
          <Image
            src="/xpert-logo.png" // Directly reference the image path within public
            alt="Odyssey Xtreem Logo"
            width={100}
            height={100}
          />
        </div>
      </div>
    </FormCard>
  );
}

export default NoCalForm;
