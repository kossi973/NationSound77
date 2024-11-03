import { useEffect } from "react";
import { wpPath } from "../config/Context";
import AfficherTitre from '../components/AfficherTitre';

// Afficher la page externe wordpress pour les mentions légales
function MentionsLegales() {
    useEffect(() => {
        window.scrollTo(0, 0);   
      }, []);

    return (
        <main className='min-h-screen bg-beige'>
            <div className='min-h-screen flex contain-fluid overflow-hidden grid text-yellow-100'>
                <AfficherTitre titre="MENTIONS LEGALES" />
                <iframe className="pt-3 h-[60rem]" src= {wpPath + "mentions-legales/"} height="100vh" width="100%"></iframe>
            </div>
        </main>
    );
}

export default MentionsLegales;