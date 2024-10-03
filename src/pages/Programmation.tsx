import { EventsListProps } from '../config/Context';
import { ArtisteProps } from '../config/Context';
import { useState, useEffect, ChangeEvent } from 'react';
import FicheArtiste from '../components/FicheArtiste';
// import { FicheProps } from '../components/FicheArtiste';

type SelectFilters1Props = {
    defaultValue: number;
    onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

type SelectFilters2Props = {
    defaultValue: string;
    onSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectJour({defaultValue, onSelect}: SelectFilters1Props) {  // Afficher la liste des jours
    return (
        <div className='ml-10 font-bold italic'>
            <p className="mt-4 ml-6">Jour</p>
            <select value={defaultValue} className="my-1 ml-2 text-amber-200 bg-amber-700 rounded-lg border-2 border-amber-200" onChange={(e) => onSelect(e)}>
                <option value={0}>Tous</option>
                <option value={1}>Jour 1</option>
                <option value={2}>Jour 2</option>
                <option value={3}>Jour 3</option>
            </select>
        </div>
    );
}

function SelectHoraire({defaultValue, onSelect}: SelectFilters1Props) {  // Afficher la liste des horaires
    return (
        <div className='ml-10 font-bold italic'>
            <p className="mt-4 ml-1">Horaires</p>
            <select value={defaultValue} className="my-1 ml-2 text-amber-200 bg-amber-700 rounded-lg border-2 border-amber-200" onChange={(e) => onSelect(e)}>
                <option value={14}>14h</option>
                <option value={16}>16h</option>
                <option value={18}>18h</option>
                <option value={20}>20h</option>
            </select>
        </div>
    );
}

function SelectStyle({defaultValue, onSelect}: SelectFilters2Props) {  // Afficher la liste des styles
    return (
        <div className='ml-10 font-bold italic'>
            <p className="mt-4 ml-7">Style</p>
            <select value={defaultValue} className="my-1 ml-2 text-amber-200 bg-amber-700 rounded-lg border-2 border-amber-200" onChange={(e) => onSelect(e)}>
                <option value={"Tous"}>Tous</option>
                <option value={"Blues"}>Blues</option>
                <option value={"Jazz"}>Jazz</option>
                <option value={"Reggae"}>Reggae</option>
                <option value={"Rock"}>Rock</option>
                <option value={"Salsa"}>Salsa</option>
                <option value={"Zouk"}>Zouk</option>
            </select>
        </div>
    );
}

function SelectScene({defaultValue, onSelect}: SelectFilters1Props) {  // Afficher la liste des scenes
    return (
        <div className='ml-10 font-bold italic'>
            <p className="mt-4 ml-7">Scene</p>
            <select value={defaultValue} className="my-1 ml-2 text-amber-200 bg-amber-700 rounded-lg border-2 border-amber-200" onChange={(e) => onSelect(e)}>
                <option value={0}>Toutes</option>
                <option value={1}>Scene 1</option>
                <option value={2}>Scene 2</option>
                <option value={3}>Scene 3</option>
                <option value={4}>Scene 4</option>
                <option value={5}>Scene 5</option>
            </select>
        </div>
    );
}

function Programmation() {
    const [eventsList, setEventsList] = useState<EventsListProps[]>([]);
    const [artistesList, setArtistesList] = useState<ArtisteProps[]>([]);
    const [filteredArtistes, setFilteredArtistes] = useState<ArtisteProps[]>([]);
    const [jour, setJour] = useState(0);
    const [horaire, setHoraire] = useState(14);
    const [style, setStyle] = useState("Tous");
    const [scene, setScene] = useState(0);

    useEffect(() => { //importer la liste des events
        fetch('events-list.json')
            .then((response) => response.json())
            .then((json) => {
                setEventsList(json);                     
            })
            .catch((error) => {alert(error)});
    },[]);

    useEffect(() => { //importer la liste des artistes
        fetch('artistes.json')
            .then((response) => response.json())
            .then((json) => {
                setArtistesList(json);                
            })
            .catch((error) => {alert(error)});
    },[]);

    const handleOnSelectJour = (event: ChangeEvent<HTMLSelectElement>) => { // gérer la sélection des jours
        const jour = Number(event.target.value);        
        setJour(jour);
    };

    const handleOnSelectHoraire = (event: ChangeEvent<HTMLSelectElement>) => { // gérer la sélection des horaires
        const horaire = Number(event.target.value);        
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

    useEffect(() => {
        window.scrollTo(0, 0);
        // Croiser deux listes distinctes pour identifier les artistes filtrés :
            // filtrer les evenements par jour, horaire et scene
        const eventsFiltres = eventsList.filter((event) => (event.jour === jour || jour === 0) && (event.horaire >= horaire) && (event.scene === scene || scene === 0));
            // puis récupérer la liste des artistes résultant de ce filtrage
        const artistesEvents = (eventsFiltres.map(event => event.artiste));
            // enfin, filtrer l'autre liste d'artistes selon le style et croiser avec la liste précédente
        setFilteredArtistes(artistesList.filter((artiste) => (artiste.style === style || style === "Tous") && (artistesEvents.includes(artiste.nom))));      
        
    }, [artistesList,jour,horaire,style,scene]);

    const AfficherTousArtistes = () => { // reset les filtres
        setJour(0);
        setHoraire(14);
        setStyle("Tous");
        setScene(0);
    };

    return (
        // page programmation
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-800/80 '>
                <div className='bg-amber-800/30 flex contain-fluid overflow-hidden grid text-yellow-100'>
                    <div className='bg-hero2 bg-cover bg-bottom h-40 shadow-lg shadow-orange-300'>
                        <h1 className='mt-12 h-12 text-4xl font-bold text-yellow-200 text-center bg-orange-600/80'>PROGRAMMATION</h1>
                    </div>
                    <div className='flex flex-wrap '>
                        {/* Définir les listes de filtres; jour, horaires, style et scene */}
                        <div> 
                            {<SelectJour defaultValue={jour} onSelect={handleOnSelectJour} />} 
                        </div>
                        <div> 
                            {<SelectHoraire defaultValue={horaire} onSelect={handleOnSelectHoraire} />}
                        </div>
                        <div> 
                            {<SelectStyle defaultValue={style} onSelect={handleOnSelectStyle} />}
                        </div>
                        <div> 
                            {<SelectScene defaultValue={scene} onSelect={handleOnSelectScene} />}
                        </div>
                        <button className='ml-10 mt-10 font-bold italic' onClick={AfficherTousArtistes}>
                            <p className="px-2 ml-2 text-amber-200 bg-amber-700 rounded-lg border-2 border-amber-200 active:shadow-xl active:bg-amber-500">Tous les artistes</p>                            
                        </button>
                    </div>
                    <div className='m-10 shadow-lg shadow-orange-300 bg-sky-700/60 rounded-lg'>
                        <p className='flex justify-center font-bold italic text-2xl mb-4 pb-2 border-b border-b-yellow-600'>Les artistes du festival</p>
                        {/* <hr className='mb-10' />  */}
                        <ul className='px-10 flex flex-wrap justify-center'>
                            {filteredArtistes.map((artiste) => (
                                <li key={artiste.id} className='w-40 md:w-64 rounded text-white italic mb-10 md:mb-32 mx-5 bg-yellow-700/20 shadow shadow-yellow-100'>
                                    {/* afficher la fiche de l'artiste et le lien vers sa programmation journalière */}

                                        <img src={artiste.image} alt={artiste.nom} className='rounded-t w-40 h-40 md:size-64'/>
                                        <p className='font-bold pl-2'>{artiste.nom}</p>
                                        <p className='pl-2'>{artiste.style}</p>
                                                                                                            
                                        {<FicheArtiste {...{artiste: artiste, eventsArtiste: eventsList.filter((event) => (event.artiste === artiste.nom))}}/>}

                                        {/* <Link to='/pages/FicheArtiste' state={{from:'Programmation', artiste: artiste, events: eventsList.filter((event) => (event.artiste === artiste.nom))}}> */}    
                                        {/* </Link> */}                                    
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