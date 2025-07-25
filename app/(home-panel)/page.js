"use client"

import HomeCard from "../components/Home-card";
import { useLoggers } from "../store/user-loggers-context";
import Spinner from "../components/spinner";

export default function Home() {

  const {
    allLoggers,
    waterLevelLoggers,
    parLoggers,
    conductivityLoggers,
    depthLoggers,
    temperatureLoggers,
    rainGaugeLoggers,
    soilMoistureLoggers,
    wipers,
    xtreemConductivityLoggers,
    isLoading,
    error,
  } = useLoggers();

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
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="PAR"
            text="The Xtreem PAR logger is easier to use than ever and has improved specifications."
            link="/par/home"
            qty={parQtyMsg}
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Water Level"
            text="The Xtreem water level logger is easier to use than ever and has improved specifications."
            link="/wl/home"
            qty={wlQtyMsg}
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Soil Moisture"
            text="The Soil Moisture logger is easier to use than ever and has improved specifications."
            link="/sm/home"
            qty={smQtyMsg}
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Temperature"
            text="The Xtreem temperature logger is easier to use than ever and has improved specifications."
            link="/tmp/home"
            qty={tempQtyMsg}
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Rain Gauge"
            text="The Rain Gauge logger is easier to use than ever and has improved specifications."
            link="/rg/home"
            qty={rgQtyMsg}
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Hydro Wipers"
            text="The hydroo wipers are easier to use than ever and has improved specifications."
            link="/rg/home"
            qty={wiperQtyMsg}
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Conductivity"
            text="The Xtreem Conductivity logger is easier to use than ever and has improved specifications."
            link="/ct/home"
            qty={ctQtyMsg}
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Depth"
            text="The Xtreem Depth logger is easier to use than ever and has improved specifications."
            link="/dt/home"
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
