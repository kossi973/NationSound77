function Contacts() {

    return (
        // page Contacts
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-800/90 flex contain-fluid overflow-hidden grid text-yellow-100'>             
                {/* titre */}
                <div className='bg-hero2 bg-cover bg-bottom h-40 shadow-lg shadow-orange-300'>
                    <h1 className='mt-12 h-auto py-4 text-4xl font-bold text-yellow-200 text-center bg-orange-600/80'>NOUS CONTACTER</h1>
                </div>                          
                <iframe className="py-3 h-[65rem] md:h-[79rem]"  src="http://nation-sound77.local/nous-contacter/" height="1000px" width="100%"></iframe>                
                
            </div>
        </main>
    );
}

export default Contacts;