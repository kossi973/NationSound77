import { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {MarkersProps, FiltersMarkersProps, EventsListProps} from '../config/Context';
import FetchData from '../components/FetchData';

// Coordonnées du festival
const centerLat = 48.84840264440768;
const centerLong = 2.6710615016030226;
const locationRedIcon = 'https://cdn-icons-png.flaticon.com/512/684/684908.png';
// const visitorRedIcon = 'https://cdn-icons-png.flaticon.com/512/6638/6638791.png';

// Define custom icon
function customIcon(urlMarker: string) {
  return new L.Icon({
    iconUrl: urlMarker,
    iconSize: [40, 40], // size of the icon
    iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});
};

// Définir les catégories de filtres
const filtresMarkers = [
  { id: "id1", label: "Le festival", check: true },
  { id: "id2", label: "infos", check: true },
  { id: "id3", label: "scenes", check: true },
  { id: "id4", label: "secours", check: true },
  { id: "id5", label: "snacks", check: true },
  { id: "id6", label: "shops", check: true },
  { id: "id7", label: "toilettes", check: true },
  { id: "id8", label: "parkings", check: true }
];

const NationMap = () => {
  const mapRef = useRef<L.Map>(null);
  const [markers, setMarkers] = useState<MarkersProps[]>([]);
  const [filteredMarkers, setfilteredMarkers] = useState<MarkersProps[]>([]);
  const [eventsList, setEventsList] = useState<EventsListProps[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  
  FetchData('wp-json/wp/v2/programmation-ns?_fields=acf&per_page=50&order=asc', setEventsList ); //importer la programmation
  FetchData('wp-json/wp/v2/point-dinteret?_fields=acf&per_page=50', setMarkers ); //importer la liste des points d'intérêts (POI)
 
  // Recadrer la carte
  const recadrerCarte = (latitude: number, longitude: number, zoom: number) => {
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], zoom);
    }
  };

  // Situer le visiteur
  function situerVisiteur() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        () => {
          console.error("Géolocalisation non disponible ou permission refusée.");
        }
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Afficher les markers au démarrage   
    setfilteredMarkers(markers.filter((marker) => (filtresMarkers).some((filtre) => (filtre.label === marker.acf.categorieMarker) && filtre.check ))); 
    situerVisiteur();
  }, [markers]);

  // Afficher les markers filtrés
  const handleOnClick = (filtre: FiltersMarkersProps) => {
    if (filtre.label === "Le festival") {
      recadrerCarte(centerLat, centerLong, 15); 
      situerVisiteur();
      filtresMarkers.forEach(filter => filter.check = true);
    } else {
      filtresMarkers.forEach(filter => filter.check = filter.label === filtre.label);
    }
    setfilteredMarkers(markers.filter((marker) => (filtresMarkers).some((filtre) => (filtre.label === marker.acf.categorieMarker) && filtre.check )));
  };

  const AfficherInfosPOI = (categoriePOI: string, nomPOI: string) => {
    let infosScene;
    if (categoriePOI !== "scenes") {
      infosScene = nomPOI;
    } else { 
        const noScene = Number(nomPOI.slice(6,7));

        // Sélectionner les événements de la scène
        const sceneEvents = eventsList.filter( event => event.acf.scene_festival === noScene);
        // Trier la liste des événements par horaires
        const trierHoraires = sceneEvents.sort((a, b) => a.acf.horaire_event > b.acf.horaire_event ? 1 : -1);
        // Puis par jours
        const trierJours = trierHoraires.sort((a, b) => a.acf.jour_event - b.acf.jour_event);
        // Mettre en forme le programme de la scène
        const programmeScene = trierJours.map(event => "&nbsp ► Jour " + event.acf.jour_event + " - " + event.acf.horaire_event.slice(0,5) + " - " + event.acf.event_festival + " " + event.acf.artiste_festival);    
        
        infosScene = nomPOI + " ----------------------------------------------<br />" + programmeScene.join(`<br />`);
    };
    return infosScene;
  }

  return (
    <>
      <div className="bg-hero2 bg-cover bg-bottom flex flex-wrap justify-start md:justify-end p-2">
        {filtresMarkers.map((filtre) => (
          <button key={filtre.id} onClick={() => handleOnClick(filtre)}>
            <p className="border border-1 bg-sky-800 text-sm md:text-lg font-bold md:font-normal text-white italic border rounded-lg p-1 m-1 md:p-2">{filtre.label}</p>
          </button>
        ))}
      </div>
      <hr className="h-2 bg-amber-400" />
      <div>
        <MapContainer
          center={[centerLat, centerLong]}
          zoom={15}
          ref={mapRef}
          style={{ zIndex: 5, height: "70vh", width: "100vw" }}
        >
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userLocation && (
            <Marker position={userLocation} icon={customIcon(locationRedIcon)}>
              <Popup>Vous êtes ici</Popup>
            </Marker>
          )}          
          {filteredMarkers.map((marker, index) => (
            <Marker key={index} position={[marker.acf.latitudeMarker, marker.acf.longitudeMarker]} icon={customIcon(marker.acf.urlMarker)}>
                <Popup>
                  <div className="text-blue-900 font-bold" dangerouslySetInnerHTML={{ __html: AfficherInfosPOI(marker.acf.categorieMarker, marker.acf.nomMarker) }} />                  
                </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default NationMap;