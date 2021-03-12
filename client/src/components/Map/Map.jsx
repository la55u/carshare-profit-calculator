import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { locations } from "../../utils/locations";
import "./Map.css";

export const CarMap = () => {
  const [cars, setCars] = useState([]);
  const [city, setCity] = useState(55);

  const idToCity = {};
  Object.keys(locations).forEach((country) =>
    locations[country].forEach((city) => (idToCity[city.id] = city))
  );

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8081");
    ws.onmessage = (event) => {
      let json = JSON.parse(event.data);
      if (Array.isArray(json)) {
        // initial list
        setCars(json);
        //json.forEach((v) => addVehicleMarker(v, true));
      } else if ("VEHICLE_LIST_UPDATE" === json.eventType) {
        //json.addedVehicles.forEach(addVehicleMarker);
        //json.removedVehicles.forEach(removeVehicleMarker);
        const filteredVehicles = cars.filter(
          (c) => !json.removedVehicles.includes(c.id)
        );
        //setCars([...filteredVehicles, ])
      }
    };
  }, []);

  // document.querySelectorAll("#countries li").forEach((li) => {
  //   li.onclick = () => {
  //     updateCities(li.innerText);
  //     document
  //       .querySelectorAll("#countries li.selected")
  //       .forEach((li) => li.classList.remove("selected"));
  //     li.classList.add("selected");
  //   };
  // });

  function changeLocation(id) {
    setCity(id);
  }

  console.log(cars);

  let markers = {};
  function addVehicleMarker(vehicle, initial = false) {
    //   let geoCoords = vehicle.geoCoordinate;
    //   if (geoCoords !== undefined) {
    //     const icon = L.divIcon({
    //       iconAnchor: [0, 24],
    //       labelAnchor: [-6, 0],
    //       popupAnchor: [0, -36],
    //       html: `<span class="marker ${
    //         initial ? "available" : "new"
    //       }"><i class="fas fa-car"></i></span>`,
    //     });
    //     let fuelIcon =
    //       vehicle.fuelType === "ELECTRIC"
    //         ? '<i class="fas fa-bolt"></i>'
    //         : '<i class="fas fa-gas-pump"></i>';
    //     let marker = L.marker([
    //       vehicle.geoCoordinate.latitude,
    //       vehicle.geoCoordinate.longitude,
    //     ])
    //       .addTo(map)
    //       .setIcon(icon).bindPopup(`
    //               <div class="popup-car">
    //                   <div>
    //                       <img width="150" height="150" src="${
    //                         vehicle.imageUrl
    //                       }">
    //                   </div>
    //                   <div class="popup-car-details">
    //                       <div>${vehicle.plate}</div>
    //                       <div>${vehicle.address.split(",")[0]}</div>
    //                       <div>
    //                           <span>${vehicle.fuellevel}%</span>
    //                           ${fuelIcon}
    //                       </div>
    //                   </div>
    //               </div>
    //           `);
    //     markers[vehicle.id] = marker;
    //   }
  }

  function removeVehicleMarker(id) {
    //   let marker = markers[id];
    //   if (marker !== undefined) {
    //     //marker.removeFrom(map);
    //     //delete markers.id;
    //     const icon = L.divIcon({
    //       iconAnchor: [0, 24],
    //       labelAnchor: [-6, 0],
    //       popupAnchor: [0, -36],
    //       html: `<span class="marker unavailable"><i class="fas fa-car"></i></span>`,
    //     });
    //     marker.setIcon(icon);
    //   }
  }

  return (
    <>
      <ul>
        {Object.keys(locations).map((loc) => (
          <li key={loc}>
            {loc}
            <ul>
              {locations[loc].map((city) => (
                <li key={city.name} onClick={() => changeLocation(city.id)}>
                  {city.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <MapContainer
        center={[idToCity[city].geo.lat, idToCity[city].geo.lng]}
        zoom={12.1}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cars.map((car) => (
          <Marker
            key={car.id}
            position={[car.geoCoordinate.latitude, car.geoCoordinate.longitude]}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};
