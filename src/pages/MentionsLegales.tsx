import { useEffect } from "react";
import { wpPath } from "../config/Context";
import AfficherTitre from '../components/AfficherTitre';

function MentionsLegales() {
    useEffect(() => {
        window.scrollTo(0, 0);   
      }, []);

    return (
        // page mentions légales
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-800/90 flex contain-fluid overflow-hidden grid text-yellow-100'>
                <AfficherTitre titre="MENTIONS LEGALES" />
                <iframe className="pt-3 h-[90rem]" src= {wpPath + "mentions-legales/"} height="100vh" width="100%"></iframe>
            </div>
        </main>
    );
}

export default MentionsLegales;