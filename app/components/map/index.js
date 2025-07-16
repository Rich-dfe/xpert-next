import dynamic from "next/dynamic";

const Map = dynamic(()=> import('./Map-logger'),{ssr:false});

export default Map