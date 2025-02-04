import { useEffect } from "react";
import { wpPath } from "../config/Context";
import AfficherTitre from '../components/AfficherTitre';

// Afficher la page externe wordpress pour la FAQ
function Faq() {
    useEffect(() => {
        window.scrollTo(0, 0);   
      }, []);
      
    return (
        <main className='min-h-screen bg-beige'>
            <div className='min-h-screen flex contain-fluid overflow-hidden grid text-yellow-100'>
                <AfficherTitre titre="FAQ" />     
                <iframe className="pt-3 h-[100rem] md:h-[85rem]"  src= {wpPath + "faq/"} height="100vh" width="100%"></iframe> 
            </div>
        </main>
    );
}

export default Faq;