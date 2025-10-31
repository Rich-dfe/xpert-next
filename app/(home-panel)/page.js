"use client"
import Link from "next/link";
import HomeCard from "../components/Home-card";
import { useLoggers } from "../store/user-loggers-context";
import Spinner from "../components/spinner";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter(); // Initialize router hook

  const {
    waterLevelLoggers,
    parLoggers,
    conductivityLoggers,
    depthLoggers,
    temperatureLoggers,
    rainGaugeLoggers,
    soilMoistureLoggers,
    wipers,
    isLoading,
  } = useLoggers();

  const handleCardClick = (link) => {
    //Navigate programmatically
    router.push(link);

    //Can be used for debug if 'persist logs' is not avaialble in dev tools.
    // setTimeout(() => {
    //     router.push(link);
    // }, 2000);
  };

  const parQtyMsg = (!isLoading) ? `x ${parLoggers.length}` : "...Loading"
  const wlQtyMsg = (!isLoading) ? `x ${waterLevelLoggers.length}` : "...Loading"
  const smQtyMsg = (!isLoading) ? `x ${soilMoistureLoggers.length}` : "...Loading"
  const tempQtyMsg = (!isLoading) ? `x ${temperatureLoggers.length}` : "...Loading"
  const rgQtyMsg = (!isLoading) ? `x ${rainGaugeLoggers.length}` : "...Loading"
  const wiperQtyMsg = (!isLoading) ? `x ${wipers.length}` : "...Loading"
  const ctQtyMsg = (!isLoading) ? `x ${conductivityLoggers.length}` : "...Loading"
  const dtQtyMsg = (!isLoading) ? `x ${depthLoggers.length}` : "...Loading"

  return (
    <>
    {(isLoading) ? <Spinner /> : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 bg-gray-300">
        <div 
        className="mt-8 mb-8 ml-4 mr-4 cursor-pointer"
        onClick={() => handleCardClick(`/pages/home?loggerType=${18}`)}
        >
          <HomeCard
            product="PAR"
            text="The Xtreem PAR logger is easier to use than ever and has improved specifications."
            qty={parQtyMsg}
          />
        </div>
        <div 
        className="mt-8 mb-8 ml-4 mr-4 cursor-pointer"
        onClick={() => handleCardClick(`/pages/home?loggerType=${1}`)}
        >
          <HomeCard
            product="Water Level"
            text="The Xtreem water level logger is easier to use than ever and has improved specifications."
            qty={wlQtyMsg}
          />
        </div>
        <div 
        className="mt-8 mb-8 ml-4 mr-4 cursor-pointer"
        onClick={() => handleCardClick(`/pages/home?loggerType=${22}`)}
        >
          <HomeCard
            product="Soil Moisture"
            text="The Soil Moisture logger is easier to use than ever and has improved specifications."
            qty={smQtyMsg}
          />
        </div>
        <div 
        className="mt-8 mb-8 ml-4 mr-4 cursor-pointer"
        onClick={() => handleCardClick(`/pages/home?loggerType=${15}`)}
        >
          <HomeCard
            product="Temperature"
            text="The Xtreem temperature logger is easier to use than ever and has improved specifications."
            qty={tempQtyMsg}
          />
        </div>
        <div 
        className="mt-8 mb-8 ml-4 mr-4 cursor-pointer"
        onClick={() => handleCardClick(`/pages/home?loggerType=${19}`)}
        >
          <HomeCard
            product="Rain Gauge"
            text="The Rain Gauge logger is easier to use than ever and has improved specifications."
            qty={rgQtyMsg}
          />
        </div>
        <div 
        className="mt-8 mb-8 ml-4 mr-4 cursor-pointer"
        onClick={() => handleCardClick(`/pages/home?loggerType=${23}`)}
        >
          <HomeCard
            product="Hydro Wipers"
            text="The hydroo wipers are easier to use than ever and has improved specifications."
            qty={wiperQtyMsg}
          />
        </div>
        <div 
        className="mt-8 mb-8 ml-4 mr-4 cursor-pointer"
        onClick={() => handleCardClick(`/pages/home?loggerType=${31}`)}
        >
          <HomeCard
            product="Conductivity"
            text="The Xtreem Conductivity logger is easier to use than ever and has improved specifications."
            qty={ctQtyMsg}
          />
        </div>
        <div 
        className="mt-8 mb-8 ml-4 mr-4 cursor-pointer"
        onClick={() => handleCardClick(`/pages/home?loggerType=${12}`)}
        >
          <HomeCard
            product="Depth"
            text="The Xtreem Depth logger is easier to use than ever and has improved specifications."
            qty={dtQtyMsg}
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Shop Odyssey"
            text="Stock up on some new loggers and check out any latest offers ."
            link="http://www.odysseydatarecording.com/"
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Licenses"
            text="Stock up on some new loggers and check out any latest offers ."
            link="/licenses/licenses"
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Technical Support"
            text="Stock up on some new loggers and check out any latest offers ."
            link="/support/help"
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Server Settings"
            text="Stock up on some new loggers and check out any latest offers ."
            link="/support/help"
          />
        </div>
      </div>
    </>
  );
}
