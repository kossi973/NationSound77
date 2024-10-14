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

    useEffect(() => { //importer la programmation
        const fetchPosts = async () => {
          try {
            const response = await fetch('http://nation-sound77.local/wp-json/wp/v2/programmation-ns?_fields=acf&per_page=50');
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des données');
            }
            const data = await response.json();
            setEventsList(data);
            
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
            const response = await fetch('http://nation-sound77.local/wp-json/wp/v2/calendrier-festival?_fields=acf&orderby=title&order=asc');
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des données');
            }
            const data = await response.json();
            setCalendrier(data);
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
            const response = await fetch('http://nation-sound77.local/wp-json/wp/v2/artiste-du-festival?_fields=acf&per_page=50&orderby=title&order=asc');
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des données');
            }
            const data = await response.json();
            setArtistesList(data);
          } catch (error: any) {
            <p>{error}</p>;
          } finally {
            <p>Chargement en cours...</p>;
          }
          
        };    
        fetchPosts();       
        
      }, []);


    useEffect(() => {
        //Trier la liste des événements par horaires
        const trierHoraires = eventsList.sort((a, b) => a.acf.horaire_event > b.acf.horaire_event ? 1 : -1);
        //Puis par jours
        const trierJours = trierHoraires.sort((a, b) => a.acf.jour_event - b.acf.jour_event);
        // Grouper les events par jours  
        const grouperJours = trierJours.reduce((acc: { [key: string]: EventsListProps[] }, event: EventsListProps) => {
            if (!acc[event.acf.jour_event]) {
                acc[event.acf.jour_event] = [];
            }
            acc[event.acf.jour_event].push(event);
            return acc;
        }, {} as { [key: string]: EventsListProps[] });
        setActualites(grouperJours);
    },[eventsList]);

    
    const formatDate = (dateString: string) => {
        const annee = dateString.slice(0,4);
        const moisAconvertir = dateString.slice(4,6);
        const jour = dateString.slice(6,8);
        let mois;
        switch (moisAconvertir) {
          case "01" : mois = "janvier"; break;
          case "02" : mois = "février"; break;
          case "03" : mois = "mars"; break;
          case "04" : mois = "avril"; break;
          case "05" : mois = "mai"; break;
          case "06" : mois = "juin"; break;
          case "07" : mois = "juillet"; break;
          case "08" : mois = "août"; break;
          case "09" : mois = "septembre"; break;
          case "10" : mois = "octobre"; break;
          case "11" : mois = "novembre"; break;
          case "12" : mois = "décembre"; break;
        };
        const date = jour + " " + mois + " " + annee;
        return date;        
    };


    return (
        // page principale SOUND NATION
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-600/90 flex contain-fluid overflow-hidden grid text-yellow-100'>             
                {/* titre */}
                <div className='bg-hero2 bg-cover bg-bottom h-40 shadow-lg shadow-orange-300'>
                    <h1 className='mt-12 h-auto py-4 text-4xl font-bold text-yellow-200 text-center bg-orange-600/80'>FESTIVAL NATION SOUND</h1>
                </div>

                <div className='font-bold h-auto my-3 w-full md:w-1/2 mx-auto bg-blue-800/80 rounded-lg shadow-lg shadow-orange-300'>
                    { Object.keys(actualites).map((jour: string ) => (
                        <div key={jour} className='mb-16'>
                            <p className='mt-2 text-xl text-center'>-- JOUR {jour} --</p>
                            <p className='text-yellow-400 text-xl text-center'>{calendrier.map((event) => event.acf.jour_festival == jour ? formatDate(event.acf.date_festival) : "")}</p>
                            <hr className='my-2'></hr>
                            <ul className='pl-16 xl:pl-40'>
                                {actualites[jour].map((event, index) => (
                                    <li key={index} className='my-4'>                                                                              
                                        <div className='flex'>
                                            <img src={artistesList.find((artiste) => artiste.acf.nom_de_lartiste === event.acf.artiste_festival)?.acf.url_du_visuel || logoUrl} alt="Nation Sound" className='rounded-md w-12 h-12 md:size-24'/>

                                            <p className='pl-4 my-auto italic text-lg'>{event.acf.horaire_event.slice(0,5)} - {event.acf.event_festival} {event.acf.artiste_festival} - scene {event.acf.scene_festival}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <hr className='my-2'></hr>  
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