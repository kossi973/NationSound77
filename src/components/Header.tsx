import { useState } from 'react';
import { Link } from 'react-router-dom';

const logoUrl = '/images/logo-ns.png';

// Afficher le header: afficher le logo de retour vers la page d'accueil
// Afficher les menus smartphone et desktop
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <header className="container-fluid h-24 md:h-32 w-full bg-amber-400 mx-auto flex justify-between items-center px-5 md:px-10">
                <div>                    
                    <Link to={"/"} onClick={() => setIsOpen(false)}><img className="h-20 md:h-24 rounded-full" src={logoUrl} alt="logo-ns" /></Link>
                </div>

                <div className='md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)}>                    
                        {!isOpen && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        }
                        {isOpen && <svg width="36px" height="36px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>}
                    </button>
                </div>
                
                {/* Afficher le menu smartphone */}
                {isOpen &&
                    <div className="right-10 z-10 shadow-md shadow-orange-300 text-yellow-200 text-lg font-bold absolute top-24 h-86 w-4/5 rounded-b-xl bg-amber-600/95 md:hidden">
                        <div>
                            <nav className='flex flex-col pl-4' onClick={() => setIsOpen(!isOpen)}>
                                <ul className='font-bold' >
                                    <li className='my-6'><Link to={"/"}>Concerts</Link></li>
                                    <li className='mb-6'><Link to={"/Programmation"} >Programmation</Link></li>
                                    <li className='mb-6'><a href="https://nationsound77.infinityfreeapp.com/nationsound-wp/billeterie/">Billetterie</a></li>                        
                                    <li className='mb-6'><Link to={"/Faq"} >FAQ</Link></li>
                                    <li className='mb-6'><Link to={"/NationMap"} >Carte Interactive </Link></li>
                                </ul>
                            </nav>
                        </div>                                
                    </div>}
                    
                {/* Afficher le menu desktop*/}
                <nav className='hidden md:inline-flex items-center'>
                    <ul className='flex text-red-500 font-bold md:text-lg xl:text-xl' >
                        <li className='mr-4 hover:text-2xl delay-100'><Link to={"/"}>Concerts</Link></li>
                        <li className='mr-4 mb-6 hover:text-2xl delay-100'><Link to={"/Programmation"} >Programmation</Link></li>
                        <li className='mr-4 mb-6 hover:text-2xl delay-100'><a href="https://nationsound77.infinityfreeapp.com/nationsound-wp/billeterie/">Billetterie</a></li>                        
                        <li className='mr-4 mb-6 hover:text-2xl delay-100'><Link to={"/Faq"} >FAQ</Link></li>
                        <li className='mr-10 mb-6 hover:text-2xl delay-100'><Link to={"/NationMap"} >Carte Interactive </Link></li>
                    </ul>                      
                </nav> 
            </header>
        </div>
    )
}

export default Header;

