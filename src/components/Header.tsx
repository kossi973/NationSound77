import { useState } from 'react';
import { Link } from 'react-router-dom';

const logoUrl = '/images/logo-ns.png';

// Afficher le header 
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <header className="container-fluid h-32 w-full bg-amber-400 mx-auto flex justify-between items-center px-10">
                <div>                    
                    <Link to={"/"} className='my-6 active:text-2xl' onClick={() => setIsOpen(false)}><img className="h-24 rounded-full" src={logoUrl} alt="logo-ns" /></Link>
                </div>
                {/* Afficher le menu */}
                <nav className='hidden md:inline-flex items-center'>
                    <ul className='flex text-red-500 font-bold text-xl' >
                        <li className='mr-4 hover:text-2xl delay-50'><Link to={"/"}>Accueil</Link></li>
                        <li className='mr-4 mb-6 hover:text-2xl delay-50'><Link to={"/Programmation"} >Programmation</Link></li>
                        <li className='mr-4 mb-6 hover:text-2xl delay-50'><Link to={"/Billeterie"} >Billeterie</Link></li>
                        <li className='mr-4 mb-6 hover:text-2xl delay-50'><Link to={"/Faq"} >FAQ</Link></li>
                        <li className='mr-10 mb-6 hover:text-2xl delay-50'><Link to={"/NationMap"} >Carte Interactive </Link></li>
                    </ul>                    
                </nav> 

                <div className='md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)}>                    
                        {
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        }
                    </button>
                </div>
                
                {/* Afficher le menu smartphone */}
                {isOpen &&
                    <div className="z-10 shadow-md shadow-orange-300 text-yellow-200 text-lg font-bold absolute top-32 h-86 left-16 w-4/5 rounded-b-xl md:w-2/5 bg-amber-600/95 md:hidden">
                        <div>
                            <nav className='flex flex-col pl-4' onClick={() => setIsOpen(!isOpen)}>
                                <Link to={"/"} className='my-6 hover:text-2xl delay-50'>Accueil </Link>
                                <Link to={"/Programmation"} className='mb-6 hover:text-2xl delay-50'>Programmation</Link>
                                <Link to={"/Billeterie"} className='mb-6 hover:text-2xl delay-50'>Billeterie </Link>
                                <Link to={"/Faq"} className='mb-6 hover:text-2xl delay-50'>FAQ </Link>
                                <Link to={"/NationMap"} className='mb-6 hover:text-2xl delay-50'>Carte Interactive </Link>
                            </nav>
                        </div>                                
                    </div>}
            </header>
        </div>
    )
}

export default Header;

