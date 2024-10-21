import { useRef } from 'react';
import { EventsListProps } from '../config/Context';
import { ArtisteProps } from '../config/Context';

export interface FicheProps {
  artiste: ArtisteProps;
  eventsArtiste: EventsListProps[];
}

// Afficher la fiche de l'artiste
const FicheArtiste: React.FC<FicheProps> = ({ artiste , eventsArtiste } ) =>  {
  const {url_du_visuel, nom_de_lartiste, style_de_lartiste, description_de_lartiste} = artiste.acf;

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  // Ouvrir la fenetre modale
  const OuvrirFiche = () => {
    if (dialogRef && dialogRef.current){      
      dialogRef.current.showModal();
    }
  };
  // Fermer la fenetre modale
  const FermerFiche = () => {    
      dialogRef?.current?.close();
  };
  
  return (
    <>
      <div className='text-right'>
          <button onClick={OuvrirFiche} className='text-cyan-200 underline font-bold'>Voir +</button>
      </div>
      <dialog className="overflow-hidden min-h-[75rem] bg-hero2 rounded-md text-yellow-100 absolute mt-36 w-full md:w-1/3 shadow-lg shadow-orange-300" ref={dialogRef}>

        <div className='h-[96rem] bg-blue-800/90 pb-12' >
            <button className='text-md mt-4 ml-4 border-2 rounded-full px-2' onClick={FermerFiche}>X</button>
            <h1 className='grid justify-center text-3xl mb-8 border-b border-b-yellow-600 pb-4 font-bold'>La story de l'artiste</h1>
            <div className='text-xl bg-blue-800 mx-10 shadow-lg shadow-cyan-300'>   
                <img src={url_du_visuel} alt={nom_de_lartiste} className='rounded-t w-full mb-4'/>
                <p className='font-bold pl-2 mb-4'>{nom_de_lartiste}</p>
                <p className='pl-6 mb-4'>{style_de_lartiste}</p> 
                <p className='pl-6 mb-5'>{description_de_lartiste}</p>
                <p className='pl-2 font-bold mb-1'>Programmation</p>
                <hr className="mb-2"/>
                <ul className="italic">
                  {eventsArtiste && eventsArtiste.length > 0 ? (
                    eventsArtiste.map((event, index) => (                      
                        <li className="mb-2" key={index}>
                            <div className="ml-2" >
                                <p className='pl-4'>Jour {event.acf.jour_event} - {event.acf.horaire_event.slice(0,5)} - {event.acf.event_festival} sur la scène {event.acf.scene_festival}</p>
                            </div>
                            <hr className="mt-2 mb-4"/>
                        </li>
                      ))) : (
                      <p>No events available</p>
                    )}                    
                </ul>
            </div>          
        </div>
        <div className='min-h-screen h-96'>

        </div>
      </dialog>
    </>
  );
};

export default FicheArtiste;
