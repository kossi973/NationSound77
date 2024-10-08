import { Link } from 'react-router-dom';
import { EventsListProps } from '../config/Context';
import { CalendrierProps } from '../config/Context';
import { useState, useEffect } from 'react';
import { ArtisteProps } from '../config/Context';

const logoUrl = '/images/logo-ns.png';

function Home() {
    const [eventsList, setEventsList] = useState<EventsListProps[]>([]);
    const [actualites, setActualites] = useState<{[key: string]: EventsListProps[]}>({});
    const [calendrier, setCalendrier] = useState<CalendrierProps[]>([]);
    const [artistesList, setArtistesList] = useState<ArtisteProps[]>([]);

    useEffect(() => { //importer la liste des events
        fetch('events-list.json')
            .then((response) => response.json())
            .then((json) => {
                setEventsList(json);                                                 
            })
            .catch((error) => {alert(error)});
    },[]);

    useEffect(() => { //importer le calendrier
        fetch('calendrierFestival.json')
            .then((response) => response.json())
            .then((json) => {
                setCalendrier(json);                             
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

    useEffect(() => {
        //Trier la liste des événements par horaires
        const trierHoraires = eventsList.sort((a, b) => a.horaire - b.horaire);
        //Puis par jours
        const trierJours = trierHoraires.sort((a, b) => a.jour - b.jour);
        // Grouper les events par jours  
        const grouperJours = trierJours.reduce((acc: { [key: string]: EventsListProps[] }, event: EventsListProps) => {
            if (!acc[event.jour]) {
                acc[event.jour] = [];
            }
            acc[event.jour].push(event);
            return acc;
        }, {} as { [key: string]: EventsListProps[] });
        setActualites(grouperJours);
    },[eventsList]);

    return (
        // page principale SOUND NATION
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-600/90 flex contain-fluid overflow-hidden grid text-yellow-100'>             
                {/* titre */}
                <div className='bg-hero2 bg-cover bg-bottom h-40 shadow-lg shadow-orange-300'>
                    <h1 className='mt-12 h-auto py-4 text-4xl font-bold text-yellow-200 text-center bg-orange-600/80'>FESTIVAL NATION SOUND</h1>
                </div>
                
                <div className='font-bold h-auto my-3 w-full md:w-1/2 mx-auto bg-blue-800/80 rounded-lg shadow-lg shadow-orange-300'>
                    { Object.keys(actualites).map((jours: string ) => (
                        <div key={jours} className='mb-16'>
                            <p className='mt-2 text-xl text-center'>-- JOUR {jours} --</p>
                            <p className='text-yellow-400 text-xl text-center'>{calendrier.map((event) => event.jour == jours ? event.date : "")}</p>
                            <hr className='my-2'></hr>
                            <ul className='pl-16 xl:pl-40'>
                                {actualites[jours].map((event) => (
                                    <li key={event.id} className='my-4'>                                                                              
                                        <div className='flex'>
                                            <img src={artistesList.find((artiste) => artiste.nom === event.artiste)?.image || logoUrl} alt="Nation Sound" className='rounded-md w-12 h-12 md:size-24'/>

                                            <p className='pl-4 my-auto italic text-lg'>{event.horaire} h - {event.event} {event.artiste} - scene {event.scene}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>    
                        </div>
                    ))}
                </div>
                
                <button className='h-14 w-full mb-3 md:w-1/2 px-8 mx-auto text-xl font-bold border rounded-lg bg-blue-800/80 shadow-lg shadow-orange-300 hover:ring hover:ring-violet-300 active:shadow-xl active:bg-amber-500'>
                        <Link to={"/Programmation"}>PROGRAMMATION</Link>
                </button>
                <button className='h-14 w-full mb-3 md:w-1/2 px-8 mx-auto text-xl font-bold border rounded-lg bg-blue-800/80 shadow-lg shadow-orange-300 hover:ring hover:ring-violet-300 active:shadow-xl active:bg-amber-500'>
                        <p>BILLETERIE</p>
                </button>
                <button className='h-14 w-full mb-3 md:w-1/2 px-8 mx-auto text-xl font-bold border rounded-lg bg-blue-800/80 shadow-lg shadow-orange-300 hover:ring hover:ring-violet-300 active:shadow-xl active:bg-amber-500'>
                        <Link to={"/NationMap"}>CARTE INTERACTIVE</Link>
                </button>
            </div>
        </main>
    );
}

export default Home;