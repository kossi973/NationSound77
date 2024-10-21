import { EventsListProps } from '../config/Context';
import { ArtisteProps } from '../config/Context';
import { CalendrierProps } from '../config/Context';
import { useState, useEffect, ChangeEvent } from 'react';
import FicheArtiste from '../components/FicheArtiste';

const wpPath = 'http://nation-sound77.local/';

type SelectFilters1Props = {
    defaultValue: number;
    onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options : number[];
};

type SelectFilters2Props = {
    defaultValue: string;
    onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

type SelectFilters3Props = {
    defaultValue: string;
    onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options : string[];
};

const defaultStylesList = ["Tous","Blues","Jazz","Reggae","Rock","Salsa","Zouk"];
const defaultJoursList = [1,2,3];
const defaultScenesList = [1,2,3,4,5];
const defaultHoraire = "00:00";

function SelectJour({defaultValue, onSelect, options}: SelectFilters1Props) {  // Afficher la liste des jours
    return (
        <div className='font-bold italic'>
            <p className="mt-4 ml-6">Jour</p>
            <select value={defaultValue} className="my-1 mx-2 text-amber-200 bg-amber-700 rounded-lg border-2 border-amber-200" onChange={(e) => onSelect(e)}>
                <option value={0}>Tous</option>
                {options.map((jour, index) =>
                    <option key={index} value={jour}>Jour {jour}</option>
                )}
            </select>
        </div>
    );
}

function SelectHoraire({defaultValue, onSelect}: SelectFilters2Props) {  // Afficher la liste des horaires
    return (
        <div className='md:ml-10 font-bold italic'>
            <p className="mt-4 ml-8">Horaires</p>
            <select value={defaultValue} className="my-1 ml-2 mx-2 px-3 text-amber-200 bg-amber-700 rounded-lg border-2 border-amber-200" onChange={(e) => onSelect(e)}>
                <option value={"00:00"}>Tous</option>
                <option value={"12:00"}>12h→14h</option>
                <option value={"14:00"}>14h→16h</option>
                <option value={"16:00"}>16h→18h</option>
                <option value={"18:00"}>18h→20h</option>
                <option value={"20:00"}>20h→22h</option>
                <option value={"22:00"}>22h→00h</option>
            </select>
        </div>
    );
}

function SelectStyle({defaultValue, onSelect, options}: SelectFilters3Props) {  // Afficher la liste des styles
    return (
        <div className='md:ml-10 font-bold italic'>
            <p className="mt-4 ml-7">Style</p>
            <select value={defaultValue} className="my-1 ml-2 mx-2 text-amber-200 bg-amber-700 rounded-lg border-2 border-amber-200" onChange={(e) => onSelect(e)}>
                {options.map((style, index) =>
                    <option key={index} value={style}>{style}</option>
                 )}
            </select>
        </div>
    );
}

function SelectScene({defaultValue, onSelect, options}: SelectFilters1Props) {  // Afficher la liste des scenes
    return (
        <div className='md:ml-10 font-bold italic'>
            <p className="mt-4 ml-6">Scene</p>
            <select value={defaultValue} className="my-1 mx-2 text-amber-200 bg-amber-700 rounded-lg border-2 border-amber-200" onChange={(e) => onSelect(e)}>
                <option value={0}>Toutes</option>
                    {options.map((scene, index) =>
                        <option key={index} value={scene}>Scene {scene}</option>
                )}
            </select>
        </div>
    );
}

function Programmation() {
    const [eventsList, setEventsList] = useState<EventsListProps[]>([]);
    const [artistesList, setArtistesList] = useState<ArtisteProps[]>([]);
    const [filteredArtistes, setFilteredArtistes] = useState<ArtisteProps[]>([]);
    const [jour, setJour] = useState(0);
    const [joursList, setJoursList] = useState(defaultJoursList);
    const [horaire, setHoraire] = useState(defaultHoraire);
    const [style, setStyle] = useState(defaultStylesList[0]);
    const [stylesList, setStylesList] = useState(defaultStylesList);
    const [scene, setScene] = useState(0);
    const [scenesList, setScenesList] = useState(defaultScenesList);

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

            // créer la liste des options du filtre des scènes
                //récupérer les scènes
            const scenes = data.map((scene : any)  => scene.acf.scene_festival);
                //supprimer les doublons et trier la liste
            const trierScenesUniques: any = [...new Set(scenes)].sort();
            setScenesList(trierScenesUniques);
                        
          } catch (error: any) {
            <p>{error}</p>;
          } finally {
            <p>Chargement en cours...</p>;
          }
          
        };    
        fetchPosts();       
        
    }, []);

    
    useEffect(() => { //importer la liste des artistes
    const fetchPosts = async () => {
        try {
        const response = await fetch( wpPath + 'wp-json/wp/v2/artiste-du-festival?_fields=acf&per_page=50&orderby=title&order=asc');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const data = await response.json();
        setArtistesList(data);

        // créer la liste des options du filtre de styles
            //récupérer les styles des artistes
        const styleOptions = data.map((artiste : ArtisteProps)  => artiste.acf.style_de_lartiste);
            //supprimer les doublons et trier la liste
        const trierOptionsUniques: any = [...new Set(styleOptions)].sort();
            //rajouter l'option "Tous" au début
        trierOptionsUniques.unshift("Tous");
        setStylesList(trierOptionsUniques);        

        } catch (error: any) {
        <p>{error}</p>;
        } finally {
        <p>Chargement en cours...</p>;
        }
        
        };    
        fetchPosts();       
    
    }, []);

    useEffect(() => { //importer le calendrier
        const fetchPosts = async () => {
          try {
            const response = await fetch(wpPath + 'wp-json/wp/v2/calendrier-festival?_fields=acf&orderby=title&order=asc');
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des données');
            }
            const data = await response.json();
            // créer la liste des options du filtre de jours
                //récupérer les jours du calendrier du festival
            const jours = data.map((jour: CalendrierProps)  => jour.acf.jour_festival);
            setJoursList(jours);  

          } catch (error: any) {
            <p>{error}</p>;
          } finally {
            <p>Chargement en cours...</p>;
          }
          
        };    
        fetchPosts();             
        
      }, []);

    const handleOnSelectJour = (event: ChangeEvent<HTMLSelectElement>) => { // gérer la sélection des jours
        const jour = Number(event.target.value);        
        setJour(jour);
    };

    const handleOnSelectHoraire = (event: ChangeEvent<HTMLSelectElement>) => { // gérer la sélection des horaires
        const horaire = event.target.value;        
        setHoraire(horaire);
    };

    const handleOnSelectStyle = (event: ChangeEvent<HTMLSelectElement>) => { // gérer la sélection des styles
        const style = event.target.value;        
        setStyle(style);
    };

    const handleOnSelectScene = (event: ChangeEvent<HTMLSelectElement>) => { // gérer la sélection des scenes
        const scene = Number(event.target.value);        
        setScene(scene);
    };

    const HoraireMax = (horaire: string) => {
        let max = "23:59";
        if (horaire != "00:00") {
            const heure = (Number(horaire.slice(0,2)) + 1) % 24;
            max = heure.toString()+ ":" + "59";
        }        
        return max;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        // Croiser deux listes distinctes pour identifier les artistes filtrés :
            // filtrer les evenements par jour, horaire et scene
        const eventsFiltres = eventsList.filter((event) => (event.acf.jour_event === jour || jour === 0) && (event.acf.horaire_event >= horaire) && (event.acf.horaire_event <= HoraireMax(horaire)) && (event.acf.scene_festival === scene || scene === 0));
            // puis récupérer la liste des artistes résultant de ce filtrage
        const artistesEvents = (eventsFiltres.map(event => event.acf.artiste_festival));
            // enfin, filtrer l'autre liste d'artistes selon le style et croiser avec la liste précédente
        setFilteredArtistes(artistesList.filter((artiste) => (artiste.acf.style_de_lartiste === style || style === "Tous") && (artistesEvents.includes(artiste.acf.nom_de_lartiste))));

    }, [artistesList,jour,horaire,style,scene]);

    const AfficherTousArtistes = () => { // reset les filtres
        setJour(0);
        setHoraire(defaultHoraire);
        setStyle(defaultStylesList[0]);
        setScene(0);
    };



    return (
        // page programmation
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-600/90 '>
                <div className='bg-amber-600/30 flex contain-fluid overflow-hidden grid text-yellow-100'>
                    <div className='bg-hero2 bg-cover bg-bottom h-40 shadow-lg shadow-orange-300'>
                        <h1 className='mt-12 h-12 text-4xl font-bold text-yellow-200 text-center bg-orange-600/80'>PROGRAMMATION</h1>
                    </div>
                    <div className='mx-10 mt-5 pb-5 bg-blue-800/80 rounded-lg flex flex-col justify-center'>
                        {/* Définir les listes de filtres; jour, horaires, style et scene */}
                        <div className='flex justify-center'>
                            <div> 
                            {<SelectJour defaultValue={jour} onSelect={handleOnSelectJour} options={joursList} />} 
                            </div>
                            <div> 
                                {<SelectHoraire defaultValue={horaire} onSelect={handleOnSelectHoraire} />}
                            </div>
                            <div> 
                                {<SelectStyle defaultValue={style} onSelect={handleOnSelectStyle} options={stylesList}/>}
                            </div>
                            <div> 
                                {<SelectScene defaultValue={scene} onSelect={handleOnSelectScene} options={scenesList} />}
                            </div>
                        </div>
                        <button className='mt-5 font-bold italic w-96 md:w-2/5 mx-auto' onClick={AfficherTousArtistes}>
                            <p className=" text-amber-200 bg-amber-700 rounded-lg border-2 border-amber-200 active:shadow-xl active:bg-amber-500">Tous les artistes</p>                            
                        </button>
                    </div>
                    <div className='m-10 shadow-lg shadow-orange-300 bg-blue-800/80 rounded-lg'>
                        <p className='pt-2 flex justify-center font-bold italic text-2xl mb-4 pb-2 border-b border-b-yellow-600'>Les artistes du festival</p>
                        {/* <hr className='mb-10' />  */}
                        <ul className='px-10 flex flex-wrap justify-center'>
                            {filteredArtistes.map((artiste, index) => (
                                <li key={index} className='w-40 md:w-64 rounded text-white italic mb-10 md:mb-32 mx-5 bg-yellow-700/20 shadow-lg shadow-cyan-300'>
                                    {/* afficher la fiche de l'artiste et le lien vers sa programmation journalière */}
                                        <img src={artiste.acf.url_du_visuel} alt={artiste.acf.nom_de_lartiste} className='rounded-t w-40 h-40 md:size-64'/>
                                        <p className='font-bold pl-2'>{artiste.acf.nom_de_lartiste}</p>
                                        <p className='pl-2'>{artiste.acf.style_de_lartiste}</p>
                                                                                                            
                                        {<FicheArtiste {...{artiste: artiste, eventsArtiste: eventsList.filter((event) => (event.acf.artiste_festival === artiste.acf.nom_de_lartiste))}}/>}
                                  
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Programmation;