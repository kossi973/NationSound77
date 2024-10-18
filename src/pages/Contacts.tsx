import { useEffect } from "react";

const wpPath = 'http://nation-sound77.local/';

function Contacts() {
    useEffect(() => {
        window.scrollTo(0, 0);   
      }, []);
      
    return (
        // page Contacts
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-800/90 flex contain-fluid overflow-hidden grid text-yellow-100'>             
                {/* titre */}
                <div className='bg-hero2 bg-cover bg-bottom h-40 shadow-lg shadow-orange-300'>
                    <h1 className='mt-12 h-auto py-4 text-4xl font-bold text-yellow-200 text-center bg-orange-600/80'>NOUS CONTACTER</h1>
                </div>                          
                <iframe className="py-3 h-[65rem] md:h-[79rem]" src= {wpPath + "nous-contacter/"} height="100vh" width="100%"></iframe>                
                
            </div>
        </main>
    );
}

export default Contacts;