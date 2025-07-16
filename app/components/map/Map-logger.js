import { flattenBy } from "@tanstack/react-table";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

function FlyMapTo(props) {
    const map = useMap();

    useEffect(() => {
      map.flyTo(props.center, props.zoom);
    });

    return null;
  }

export default function MapSingleLogger({coords, id, logger_name}) {
  return (
    <MapContainer className="h-100 w-full" center={coords} zoom={13} scrollWheelZoom={true} key={id} logger_name={logger_name}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyMapTo center={coords} zoom={15} />
      <Marker position={coords}>
        <Popup>{logger_name}</Popup>
      </Marker>
    </MapContainer>
  );
}
