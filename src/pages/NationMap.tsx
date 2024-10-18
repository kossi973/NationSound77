import { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {MarkersProps} from '../config/Context';
import {FiltersMarkersProps} from '../config/Context';
import { EventsListProps } from "../config/Context";

const wpPath = 'http://nation-sound77.local/';

const centerLat = 48.84840264440768;
const centerLong = 2.6710615016030226;

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
  const [markers, setMarkers] = useState<MarkersProps[]>([]);
  const [filteredMarkers, setfilteredMarkers] = useState<MarkersProps[]>([]);
  const [eventsList, setEventsList] = useState<EventsListProps[]>([]);
 
  useEffect(() => { //importer la liste des points d'intérêts (POI)
    const fetchPosts = async () => {
        try {
        const response = await fetch( wpPath + 'wp-json/wp/v2/point-dinteret?_fields=acf&per_page=50');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setMarkers(data);
        } catch (error: any) {
        <p>{error}</p>;
        } finally {
        <p>Chargement en cours...</p>;
        }
        
        };    
        fetchPosts();       
    
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Afficher les markers au démarrage
    setfilteredMarkers(markers.filter((marker) => (filtresMarkers).some((filtre) => (filtre.label === marker.acf.categorieMarker) && filtre.check )))    
  }, [markers]);

  // Afficher les markers filtrés
  const handleOnClick = (filtre: FiltersMarkersProps) => {
    if (filtre.label === "Tous") {
      filtresMarkers.forEach(filter => filter.check = true);
    } else {
      filtresMarkers.forEach(filter => filter.check = filter.label === filtre.label);
    }
    setfilteredMarkers(markers.filter((marker) => (filtresMarkers).some((filtre) => (filtre.label === marker.acf.categorieMarker) && filtre.check )));
  };
  
  useEffect(() => { //importer la programmation
    const fetchPosts = async () => {
      try {
        const response = await fetch( wpPath + 'wp-json/wp/v2/programmation-ns?_fields=acf&per_page=50');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        const trierHoraires = data.sort((a:any, b:any) => a.acf.horaire_event > b.acf.horaire_event ? 1 : -1);
        const trierJours = trierHoraires.sort((a:any, b:any) => a.acf.jour_event - b.acf.jour_event);
        setEventsList(trierJours);
        
      } catch (error: any) {
        <p>{error}</p>;
      } finally {
        <p>Chargement en cours...</p>;
      }
      
    };    
    fetchPosts();       
    
  }, []);

  const AfficherPOIInfos = (categoriePOI: string, nomPOI: string) => {
    let infosScene;
    if (categoriePOI !== "scene") {
      infosScene = nomPOI;
    } else { 
        const noScene = Number(nomPOI.slice(6,7));
        
        const sceneEvents = eventsList.filter( event => event.acf.scene_festival === noScene).map(event => " /// Jour " + event.acf.jour_event + " : " + event.acf.horaire_event.slice(0,5) + " - " + event.acf.event_festival + " " + event.acf.artiste_festival);    
        
        infosScene = nomPOI + sceneEvents.join('\n');
    };
    return infosScene;
  }

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
          center={[centerLat, centerLong]}
          zoom={15}
          ref={mapRef}
          style={{ zIndex: 5, height: "73vh", width: "100vw" }}
        >
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredMarkers.map((marker, index) => (
            <Marker key={index} position={[marker.acf.latitudeMarker, marker.acf.longitudeMarker]} icon={customIcon(marker.acf.urlMarker)}>
                <Popup>{AfficherPOIInfos(marker.acf.categorieMarker, marker.acf.nomMarker)}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default NationMap;