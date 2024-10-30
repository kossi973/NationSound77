import { useEffect } from "react";
import { wpPath } from "../config/Context";
import AfficherTitre from '../components/AfficherTitre';

function Faq() {
    useEffect(() => {
        window.scrollTo(0, 0);   
      }, []);
      
    return (
        // page Faq
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-800/90 flex contain-fluid overflow-hidden grid text-yellow-100'>
                <AfficherTitre titre="FAQ" />     
                <iframe className="pt-3 h-[100rem] md:h-[85rem]"  src= {wpPath + "faq/"} height="100vh" width="100%"></iframe> 
                <div className="bg-[#D98C3D] h-10"></div> 
            </div>
        </main>
    );
}

export default Faq;