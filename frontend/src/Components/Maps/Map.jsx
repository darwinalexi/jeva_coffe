import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "./style.css";

// Ajustar el icono por defecto
let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadow,
  iconSize: [25, 41], // tamaño del icono
  iconAnchor: [12, 41] // punto de anclaje
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapaColombia() {
  return (
    <MapContainer
      center={[4.5709, -74.2973]}
      zoom={6}
      className="mapa-colombia"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[4.5709, -74.2973]}>
        <Popup>📍 Colombia - JEVA COFFE</Popup>
      </Marker>
    </MapContainer>
  );
}
