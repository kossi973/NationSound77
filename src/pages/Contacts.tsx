import { useEffect } from "react";
import { wpPath } from "../config/Context";
import AfficherTitre from '../components/AfficherTitre';

// Afficher la page externe wordpress pour les contacts
function Contacts() {
    useEffect(() => {
        window.scrollTo(0, 0);   
      }, []);
      
    return (
        <main className='min-h-screen bg-beige'>
            <div className='min-h-screen flex contain-fluid overflow-hidden grid text-yellow-100'>
                <AfficherTitre titre="NOUS CONTACTER" />
                <iframe className="pt-3 h-[60rem]" src= {wpPath + "nous-contacter/"} height="100vh" width="100%"></iframe>
            </div>
        </main>
    );
}

export default Contacts;