import { useEffect } from "react";
import { wpPath } from "../config/Context";

function Billeterie() {
    useEffect(() => {
        window.scrollTo(0, 0);   
      }, []);
      
    return (
        // page Faq
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-800/90 flex grid text-yellow-100'>             
                {/* titre */}
                <div className='bg-hero2 bg-cover bg-bottom h-40 shadow-lg shadow-orange-300'>
                    <h1 className='mt-12 h-auto py-4 text-4xl font-bold text-yellow-200 text-center bg-orange-600/80'>BILLETERIE</h1>
                </div>                          
                <iframe className="pt-3 h-[75rem]" src= {wpPath + "billeterie/"} height="100vh" width="100%"></iframe>                
                
            </div>
        </main>
    );
}

export default Billeterie;