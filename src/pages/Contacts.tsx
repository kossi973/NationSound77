import { useEffect } from "react";
import { wpPath } from "../config/Context";
import AfficherTitre from '../components/AfficherTitre';

function Contacts() {
    useEffect(() => {
        window.scrollTo(0, 0);   
      }, []);
      
    return (
        // page Contacts
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-800/90 flex contain-fluid overflow-hidden grid text-yellow-100'>
                <AfficherTitre titre="NOUS CONTACTER" />
                <iframe className="pt-3 h-[65rem] md:h-[80rem]" src= {wpPath + "nous-contacter/"} height="100vh" width="100%"></iframe>
            </div>
        </main>
    );
}

export default Contacts;