import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CalendrierProps, EventsListProps, ArtisteProps } from '../config/Context';
import FetchData from '../components/FetchData';
import FormaterDate from '../components/FormaterDate';
import AfficherTitre from '../components/AfficherTitre';

const logoUrl = '/images/logo-ns.png';

// Afficher la page d'accueil avec le programme du festival et les liens vers la programmation, la billeterie et la carte interactive
function Home() {
    const [calendrier, setCalendrier] = useState<CalendrierProps[]>([]);
    const [eventsList, setEventsList] = useState<EventsListProps[]>([]);
    const [artistesList, setArtistesList] = useState<ArtisteProps[]>([]);
    const [programme, setProgramme] = useState<{[key: string]: EventsListProps[]}>({});

    FetchData('wp-json/wp/v2/calendrier-festival?_fields=acf&orderby=title&order=asc', setCalendrier ); // Récupérer le calendrier du festival
    FetchData('wp-json/wp/v2/programmation-ns?_fields=acf&per_page=50', setEventsList ); // Récupérer le programme du festival
    FetchData('wp-json/wp/v2/artiste-du-festival?_fields=acf&per_page=50&orderby=title&order=asc', setArtistesList ); // Récupérer la liste des artistes programmés

    useEffect(() => {
        //Trier la liste des événements par horaires et par jours
        const trierHoraires = eventsList.sort((a, b) => a.acf.horaire_event > b.acf.horaire_event ? 1 : -1);
        const trierJours = trierHoraires.sort((a, b) => a.acf.jour_event - b.acf.jour_event);
        // Grouper les événements par jours  
        const grouperJours = trierJours.reduce((acc: { [key: string]: EventsListProps[] }, event: EventsListProps) => {
            if (!acc[event.acf.jour_event]) {
                acc[event.acf.jour_event] = [];
            }
            acc[event.acf.jour_event].push(event);
            return acc;
        }, {} as { [key: string]: EventsListProps[] });
        setProgramme(grouperJours); // Définir le programme journalier
        
    },[eventsList]);

    return (
        // page principale SOUND NATION: afficher la synthèse du nombre d'artistes, de concerts, de jours et le programme par jour avec le visuel des artistes
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-600/90 flex contain-fluid overflow-hidden grid text-yellow-100'>
                <AfficherTitre titre="FESTIVAL NATION SOUND" />
                <div>
                    <p className='text-center text-yellow-200 font-bold italic text-2xl lg:text-3xl xl:text-4xl bg-blue-800/80 py-2 w-full md:w-1/2 mx-auto mt-1 border rounded-lg'>{artistesList.length} artistes - {eventsList.filter(event => event.acf.event_festival === "Live").length} concerts - {calendrier.length} jours</p>
                </div>
                <div className='font-bold h-auto my-1 w-full md:w-1/2 mx-auto bg-blue-800/80 border rounded-lg shadow-lg shadow-orange-300'>
                    { Object.keys(programme).map((jour: string ) => (
                        <div key={jour} className='mb-16'>
                            <p className='mt-4 text-xl text-center'>-- JOUR {jour} --</p>
                            <p className='text-yellow-400 text-xl md:text-2xl text-center'>{calendrier.map((event) => event.acf.jour_festival == +jour ? FormaterDate(event.acf.date_festival) : "")}</p>
                            <hr className='my-2'></hr>
                            <ul className='pl-8 xl:pl-64'>
                                {programme[jour].map((event, index) => (
                                    <li key={index} className='my-4'>                                                                              
                                        <div className='flex'>
                                            <img src={artistesList.find((artiste) => artiste.acf.nom_de_lartiste === event.acf.artiste_festival)?.acf.url_du_visuel || logoUrl} alt="Nation Sound" className='rounded-md w-12 h-12 lg:size-24'/>
                                            <div className='pl-4 my-auto italic text-lg md:text-xl'>                                                
                                                <p>{event.acf.horaire_event.slice(0,5)} - {event.acf.event_festival} {event.acf.artiste_festival}</p>
                                                <div className='text-yellow-100/75'>
                                                    <span className='pl-2 text-md'>» </span>
                                                    <span>scène {event.acf.scene_festival}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <hr className='my-2'></hr>  
                        </div>
                    ))}
                </div>
                
                <button className='h-14 w-full mb-1 md:w-1/2 px-8 mx-auto text-xl font-bold border rounded-lg bg-blue-800/80 shadow-lg shadow-orange-300 hover:ring hover:ring-violet-300 active:shadow-xl active:bg-amber-500'>
                  <Link to={"/Programmation"}>PROGRAMMATION</Link>
                </button>
                <button className='h-14 w-full mb-1 md:w-1/2 px-8 mx-auto text-xl font-bold border rounded-lg bg-blue-800/80 shadow-lg shadow-orange-300 hover:ring hover:ring-violet-300 active:shadow-xl active:bg-amber-500'>
                  <a href="https://nationsound77.infinityfreeapp.com/nationsound-wp/billeterie/">BILLETTERIE</a>
                </button>
                <button className='h-14 w-full mb-1 md:w-1/2 px-8 mx-auto text-xl font-bold border rounded-lg bg-blue-800/80 shadow-lg shadow-orange-300 hover:ring hover:ring-violet-300 active:shadow-xl active:bg-amber-500'>
                  <Link to={"/NationMap"}>CARTE INTERACTIVE</Link>
                </button>
            </div>
        </main>
    );
}

export default Home;