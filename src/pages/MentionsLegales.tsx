import { useEffect } from "react";
import { wpPath } from "../config/Context";

function MentionsLegales() {
    useEffect(() => {
        window.scrollTo(0, 0);   
      }, []);

    return (
        // page mentions légales
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-800/90 flex contain-fluid overflow-hidden grid text-yellow-100'>             
                {/* titre */}
                <div className='bg-hero2 bg-cover bg-bottom h-40 shadow-lg shadow-orange-300'>
                    <h1 className='mt-12 h-auto py-4 text-4xl font-bold text-yellow-200 text-center bg-orange-600/80'>MENTIONS LEGALES</h1>
                </div>                
                <iframe className="pt-3 h-[60rem] md:h-[50rem]" src= {wpPath + "mentions-legales/"} width="100%"></iframe>
                <div className="bg-[#D98C3D] h-10"></div>                 
            </div>
        </main>
    );
}

export default MentionsLegales;