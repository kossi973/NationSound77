import { useRef } from 'react';
import { EventsListProps } from '../config/Context';
import { ArtisteProps } from '../config/Context';

export interface FicheProps {
  artiste: ArtisteProps;
  eventsArtiste: EventsListProps[];
}

// Afficher la fiche de l'artiste
const FicheArtiste: React.FC<FicheProps> = ({ artiste , eventsArtiste } ) =>  {
  const {image, nom, style, description} = artiste;

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
          <button onClick={OuvrirFiche} className='text-cyan-200 underline'>Voir +</button>
      </div>
      <dialog className="overscroll-none bg-hero2 rounded-md text-yellow-100 absolute mt-36 h-full w-full md:w-1/3" ref={dialogRef}>
        <div className='bg-blue-800/80 pb-12' >
            <button className='text-md mt-4 ml-4 border-2 rounded-full px-2' onClick={FermerFiche}>X</button>
            <h1 className='grid justify-center text-3xl mb-8 border-b border-b-yellow-600 pb-4 font-bold'>La story de l'artiste</h1>
            <div className='bg-blue-800 mx-10 shadow-lg shadow-orange-300'>   
                <img src={(image).substring(1)} alt={nom} className='rounded-t w-full mb-4'/>
                <p className='font-bold pl-2 mb-4'>{nom}</p>
                <p className='pl-2 mb-4'>{style}</p> 
                <p className='pl-2 mb-4 pb-2 border-b border-b-yellow-600'>{description}</p>
                <p className='font-bold mb-1'>Programmation</p>
                <hr className="mb-2"/>
                <ul className="italic">
                  {eventsArtiste && eventsArtiste.length > 0 ? (
                    eventsArtiste.map((event) => (                      
                        <li className="mb-2" key={event.id}>
                            <div className="ml-2" >
                                <p>{event.event} sur la scène {event.scene}</p>
                                <p>Jour {event.jour} - {event.horaire}h</p>
                            </div>
                            <hr className="mt-2 mb-4"/>
                        </li>
                      ))) : (
                        <p>No events available</p>
                    )}                    
                </ul>
            </div>          
        </div>
      </dialog>
    </>
  );
};

export default FicheArtiste;
