import { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {MarkersProps} from '../config/Context';
import {FiltersMarkersProps} from '../config/Context';

// Define custom icon
function customIcon(urlMarker: string) {
  return new L.Icon({
    iconUrl: urlMarker,
    iconSize: [40, 40], // size of the icon
    iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
    // shadowUrl: "./shadow.png",
    // shadowSize: [28, 41] // size of the shadow
});
};

// Définir les catégories de filtres
const filtresMarkers = [
  {id: "id1",
   label: "infos",
   check: true   
  },
  {id: "id2",
   label: "scene",
   check: true   
  },
  {id: "id3",
   label: "secours",
   check: true   
  },
  {id: "id4",
    label: "snack",
    check: true   
   },
  {id: "id5",
   label: "shop",
   check: true   
  },  
  {id: "id6",
    label: "toilettes",
    check: true   
   },
  {id: "id7",
    label: "parking",
    check: true   
   },
  {id: "id8",
   label: "Tous",
   check: true   
  }
];

const NationMap = () => {
  const mapRef = useRef(null);
  const [markers, setMarkers] = useState<MarkersProps[]>([{
    "id": "id1",
    "urlMarker": "https://cdn.icon-icons.com/icons2/523/PNG/512/information_icon-icons.com_52388.png",
    "nom": "Festival Nation Sound - Parc de Rentilly",
    "latitude": 48.84840264440768, 
    "longitude": 2.6710615016030226,
    "category": "infos"
  }]);
  const [filteredMarkers, setfilteredMarkers] = useState<MarkersProps[]>([]);
  
  useEffect(() => { //importer la liste des markers
    fetch('markers.json')
        .then((response) => response.json())
        .then((json) => {
            setMarkers(json);
            // setfilteredMarkers(json);                     
        })
        .catch((error) => {alert(error)});
  },[]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Afficher les markers au démarrage
    setfilteredMarkers(markers.filter((marker) => (filtresMarkers).some((filtre) => (filtre.label === marker.category) && filtre.check )))    
  }, [markers]);

  // Afficher les markers filtrés
  const handleOnClick = (filtre: FiltersMarkersProps) => {
    if (filtre.label === "Tous") {
      filtresMarkers.forEach(filter => filter.check = true);
    } else {
      filtresMarkers.forEach(filter => filter.check = filter.label === filtre.label);
    }
    setfilteredMarkers(markers.filter((marker) => (filtresMarkers).some((filtre) => (filtre.label === marker.category) && filtre.check )));
  };
  
  return (
    <>
      <div className="flex flex-wrap justify-between md:justify-end p-2 bg-sky-200">
        {filtresMarkers.map((filtre) => (
          <button key={filtre.id} onClick={() => handleOnClick(filtre)}>
            <p className="border border-2 bg-sky-800 text-sm md:text-lg font-bold md:font-normal text-white italic border rounded-lg p-1 md:p-2">{filtre.label}</p>
          </button>
        ))}
      </div>
      <div>
        <MapContainer
          center={[markers[0].latitude, markers[0].longitude]}
          zoom={15}
          ref={mapRef}
          style={{ zIndex: 5, height: "73vh", width: "100vw" }}
        >
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredMarkers.map((marker) => (
            <Marker key={marker.id} position={[marker.latitude, marker.longitude]} icon={customIcon(marker.urlMarker)}>
              <Popup>{marker.nom}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default NationMap;