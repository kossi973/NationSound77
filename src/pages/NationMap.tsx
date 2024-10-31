import { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet-routing-machine';
import "leaflet/dist/leaflet.css";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import {MarkersProps, FiltersMarkersProps, EventsListProps} from '../config/Context';
import FetchData from '../components/FetchData';

// Typescript nécessite le typage du contrôle Routing
declare module 'leaflet' {
  namespace Routing {
    function control(options: any): any;
  }
}

// Coordonnées du festival par défaut
const centerLat = 48.84840264440768;
const centerLong = 2.6710615016030226;
const locationRedIcon = 'https://cdn-icons-png.flaticon.com/512/684/684908.png';

// Définir un icône personnalisé: url de l'image, taille de l'icône et points d'ancrage icône et popup
function customIcon(urlMarker: string) { 
  return new L.Icon({
    iconUrl: urlMarker,
    iconSize: [40, 40],
    iconAnchor: [25, 25],
    popupAnchor: [1, -34],
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

// Afficher la carte interactive: les filtres des points d'intérêts (POI), la carte et les POI, l'affichage de l'itinéraire
const NationMap = () => {
  const mapRef = useRef<L.Map>(null);
  const [markers, setMarkers] = useState<MarkersProps[]>([]);
  const [filteredMarkers, setfilteredMarkers] = useState<MarkersProps[]>([]);
  const [eventsList, setEventsList] = useState<EventsListProps[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [control, setControl] = useState(null);

  FetchData('wp-json/wp/v2/programmation-ns?_fields=acf&per_page=50&order=asc', setEventsList ); // Récupérer le programme du festival
  FetchData('wp-json/wp/v2/point-dinteret?_fields=acf&per_page=50', setMarkers ); // Importer la liste des points d'intérêts (POI)
 
  // Positionner la carte aux coordonnées avec le zoom indiqué
  const recadrerCarte = (latitude: number, longitude: number, zoom: number) => {
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], zoom);
    }
  };

  // Récupérer les coordonnées de l'utilisateur
  function SituerVisiteur() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        }
      );
    }
  };

  // Calculer et afficher l'itinéraire de la position du visiteur vers le festival
  function AfficherItineraire(afficher: boolean) {
    const map = mapRef.current;
    
    SituerVisiteur();
    
    if (map && userLocation && afficher) {
       const newControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]), // Position du visiteur
          L.latLng(centerLat, centerLong) // Position du festival
        ],
        routeWhileDragging: true,
        language: 'fr',
        showAlternatives: true,
        numberOfAlternatives: 3,
        altLineOptions: 
          { styles: [ 
            { color: 'black', opacity: 0.15, weight: 9 },
            { color: 'white', opacity: 0.8, weight: 6 },
            { color: 'blue', opacity: 0.5, weight: 2 } 
           ]
          },
        createMarker: () => { return null; } // Supprimer les markers de départ et d'arrivée

      }).addTo(map);
      setControl(newControl);
            
      return () => {
        if (map && control) {          
          map.removeControl(control);
          setControl(null);
        }
      };
    } else if (map && control && !afficher) { // Effacer l'itinéraire manuellement              
        map.removeControl(control);
        setControl(null);
    };
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset des filtres au chargement de la page
    filtresMarkers.forEach(filter => filter.check = true);
  }, []);

  useEffect(() => {
    // Afficher les POI et la position de l'utilisateur au chargement de la liste 
    setfilteredMarkers(markers.filter((marker) => (filtresMarkers).some((filtre) => (filtre.label === marker.acf.categorieMarker) && filtre.check ))); 
    SituerVisiteur();
  }, [markers]);

  // Afficher les POI filtrés: le bouton "festival" affiche tous les POI et recentre la carte sur le festival
  const handleOnClick = (filtre: FiltersMarkersProps) => {
    if (filtre.label === "Le festival") {
      recadrerCarte(centerLat, centerLong, 15); 
      SituerVisiteur();
      filtresMarkers.forEach(filter => filter.check = true);
    } else {
      filtresMarkers.forEach(filter => filter.check = filter.label === filtre.label);
    }
    setfilteredMarkers(markers.filter((marker) => (filtresMarkers).some((filtre) => (filtre.label === marker.acf.categorieMarker) && filtre.check )));
  };

  // Construire les informations des popup des POI; pour les POI de type scène, afficher les concerts
  const AfficherInfosPOI = (categoriePOI: string, nomPOI: string) => {
    let infosScene;
    if (categoriePOI !== "scenes") {
      infosScene = nomPOI;
    } else { 
        const noScene = Number(nomPOI.slice(6,7));

        // Sélectionner les événements de la scène
        const sceneEvents = eventsList.filter( event => event.acf.scene_festival === noScene);
        // Trier la liste des événements par horaires et par jours
        const trierHoraires = sceneEvents.sort((a, b) => a.acf.horaire_event > b.acf.horaire_event ? 1 : -1);
        const trierJours = trierHoraires.sort((a, b) => a.acf.jour_event - b.acf.jour_event);
        // Mettre en forme le programme de la scène
        const programmeScene = trierJours.map(event => "&nbsp ► Jour " + event.acf.jour_event + " - " + event.acf.horaire_event.slice(0,5) + " - " + event.acf.event_festival + " " + event.acf.artiste_festival);    
        
        infosScene = nomPOI + " ----------------------------------------------<br />" + programmeScene.join(`<br />`);
    };
    return infosScene;
  }

  return (
    // page carte interactive: afficher le bloc de filtres, le bouton "Itinéraire" et la carte avec l'icône du visiteur et les POI et les popup associés
    <>
      <div className="bg-hero2 bg-cover bg-bottom flex flex-wrap justify-start md:justify-end p-2">
        {filtresMarkers.map((filtre) => (
          <button key={filtre.id} onClick={() => handleOnClick(filtre)}>
            <p className="border border-1 bg-sky-800 text-sm md:text-lg font-bold md:font-normal text-white italic border rounded-lg p-1 m-1 md:p-2 active:bg-amber-500">{filtre.label}</p>
          </button>
        ))}
        <button className="italic px-2 md:p-2 text-sky-900 font-bold bg-amber-200 rounded-lg m-2 border-2 border-cyan-800 active:bg-amber-500" onClick={() => {setIsOpen(!isOpen); AfficherItineraire(!isOpen);}}>
          <p>Itinéraire</p>
        </button>
      </div>
      <hr className="h-2 bg-amber-400" />
      <div>
        <MapContainer // Afficher la carte interactive Leaflet
          center={[centerLat, centerLong]}
          zoom={15}
          ref={mapRef}
          style={{ zIndex: 5, height: "70vh", width: "100vw" }}
        >
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userLocation && ( // Afficher la position du visiteur
            <Marker position={userLocation} icon={customIcon(locationRedIcon)}>
              <Popup>Vous êtes ici</Popup>
            </Marker>
          )}          
          {filteredMarkers.map((marker, index) => ( // Afficher les POI
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