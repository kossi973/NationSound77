
// Définir la structure de l'event
export interface EventsListProps {
  id : string,
  jour : number,
  horaire : number,
  event : string,
  artiste: string,
  scene: number,
}

// Définir la structure du calendrier
export interface CalendrierProps {
  id : string,
  jour : string,
  date : string,
}

// Définir la structure de l'artiste
export interface ArtisteProps {
  id : string,
  nom: string,
  style : string,
  image : string,
  description: string,
}

// Définir la structure des markers
export interface MarkersProps {
  id : string,
  urlMarker : string,
  nom: string,
  latitude : number,
  longitude : number,
  category: string,
}

// Définir la structure des filtres
export interface FiltersMarkersProps {
  id : string,
  label : string,
  check : boolean,
}