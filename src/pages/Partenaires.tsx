import { useEffect } from "react";
import { wpPath } from "../config/Context";
import AfficherTitre from '../components/AfficherTitre';

// Afficher la page externe wordpress pour les partenaires
function Partenaires() {
    useEffect(() => {
        window.scrollTo(0, 0);   
      }, []);

    return (
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-800/90 flex contain-fluid overflow-hidden grid text-yellow-100'>
                <AfficherTitre titre="NOS PARTENAIRES" />
                <iframe className="pt-3 h-[82rem] md:h-[98rem]" src= {wpPath + "partenaires/"} height="100vh"  width="100%"></iframe>                
            </div>
        </main>
    );
}

export default Partenaires;