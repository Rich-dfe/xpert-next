import Button from "../components/Button";
import HomeCard from "../components/Home-card";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 bg-gray-300">
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="PAR"
            text="The Xtreem PAR logger is easier to use than ever and has improved specifications."
            link="/par/home"
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Water Level"
            text="The Xtreem water level logger is easier to use than ever and has improved specifications."
            link="/wl/home"
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Soil Moisture"
            text="The Soil Moisture logger is easier to use than ever and has improved specifications."
            link="/sm/home"
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Temperature"
            text="The Xtreem temperature logger is easier to use than ever and has improved specifications."
            link="/tmp/home"
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Rain Gauge"
            text="The Rain Gauge logger is easier to use than ever and has improved specifications."
            link="/rg/home"
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Conductivity"
            text="The Xtreem Conductivity logger is easier to use than ever and has improved specifications."
            link="/ct/home"
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Depth"
            text="The Xtreem Depth logger is easier to use than ever and has improved specifications."
            link="/dt/home"
          />
        </div>
        <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="Shop Odyssey"
            text="Stock up on some new loggers and check out any latest offers ."
            link="http://www.odysseydatarecording.com/"
          />
        </div>
      </div>
      <div>
        <Button link="/par/" text="PAR Page" />
      </div>
    </>
  );
}
