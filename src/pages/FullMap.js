import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../CSS/FullMap.css";

const FullMap = () => {
  const hiveLocations = [
    { id: 1, lat: 37.7749, lng: -122.4194, name: "Hive-1", bees: 5000, health: "Good" },
    { id: 2, lat: 40.7128, lng: -74.006, name: "Hive-2", bees: 4200, health: "Moderate" },
    { id: 3, lat: 34.0522, lng: -118.2437, name: "Hive-3", bees: 5300, health: "Excellent" },
    { id: 4, lat: 51.5074, lng: -0.1278, name: "Hive-4", bees: 3900, health: "Fair" },
    { id: 5, lat: 48.8566, lng: 2.3522, name: "Hive-5", bees: 4700, health: "Good" },
    { id: 6, lat: 55.7558, lng: 37.6173, name: "Hive-6", bees: 4500, health: "Moderate" },
    { id: 7, lat: 35.6895, lng: 139.6917, name: "Hive-7", bees: 5100, health: "Excellent" },
    { id: 8, lat: -33.8688, lng: 151.2093, name: "Hive-8", bees: 4900, health: "Good" },
    { id: 9, lat: 19.076, lng: 72.8777, name: "Hive-9", bees: 5200, health: "Excellent" },
    { id: 10, lat: 39.9042, lng: 116.4074, name: "Hive-10", bees: 3800, health: "Fair" },
    { id: 11, lat: -23.5505, lng: -46.6333, name: "Hive-11", bees: 4700, health: "Good" },
    { id: 12, lat: 41.9028, lng: 12.4964, name: "Hive-12", bees: 4300, health: "Moderate" },
  ];

  const [hoveredHive, setHoveredHive] = useState(null);

  return (
    <div className="fullmap-container">
      <h1 className="title">🐝 Full Map View</h1>
      
      <div className="grid-container">
        {hiveLocations.map((hive) => (
          <div
            key={hive.id}
            className="grid-box"
            onMouseEnter={() => setHoveredHive(hive)}
            onMouseLeave={() => setHoveredHive(null)}
          >
            {hive.name}
          </div>
        ))}
      </div>

      {hoveredHive && (
        <div className="hive-details">
          <h3>{hoveredHive.name}</h3>
          <p>🐝 Bees: {hoveredHive.bees}</p>
          <p>💖 Health: {hoveredHive.health}</p>
        </div>
      )}

      <MapContainer center={[37.7749, -122.4194]} zoom={2} className="full-map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {hiveLocations.map((hive) => (
          <Marker key={hive.id} position={[hive.lat, hive.lng]}>
            <Popup>
              <strong>{hive.name}</strong>
              <br />🐝 Bees: {hive.bees}
              <br />💖 Health: {hive.health}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default FullMap;