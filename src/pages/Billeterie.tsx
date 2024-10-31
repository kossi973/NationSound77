import { useEffect } from "react";
import { wpPath } from "../config/Context";
import AfficherTitre from '../components/AfficherTitre';

// Afficher la page externe wordpress pour la billeterie
function Billeterie() {
    useEffect(() => {
        window.scrollTo(0, 0);   
      }, []);
      
    return (
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-800/90 flex grid text-yellow-100'>
                <AfficherTitre titre="BILLETERIE" />
                <iframe className="pt-3 h-[90rem]" src= {wpPath + "billeterie/"} height="100vh" width="100%"></iframe>    
            </div>
        </main>
    );
}

export default Billeterie;