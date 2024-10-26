
//Définir chemin vers WordPress Headless
// export const wpPath = 'http://nation-sound77.local/';
export const wpPath = 'https://nationsound77.infinityfreeapp.com/nationsound-wp/';

// Définir la structure du calendrier
export interface CalendrierProps {
  acf : {
    jour_festival : number,
    date_festival : string,
  }

}

// Définir la structure de l'event
export interface EventsListProps {
  acf : {
    jour_event : number,
    horaire_event : string,
    event_festival : string,
    artiste_festival : string,
    scene_festival : number,
  }
    
}

// Définir la structure de l'artiste
export interface ArtisteProps {
  acf : {
    nom_de_lartiste : string,
    style_de_lartiste : string,
    description_de_lartiste : string,
    url_du_visuel : string,
  }  
}

// Définir la structure des markers de la carte
export interface MarkersProps {
  acf : {
    urlMarker : string,
    nomMarker : string,
    latitudeMarker : number,
    longitudeMarker : number,
    categorieMarker: string,
  }

}

// Définir la structure des filtres de la carte
export interface FiltersMarkersProps {
  id : string,
  label : string,
  check : boolean,
}