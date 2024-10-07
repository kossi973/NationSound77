import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Programmation from "./pages/Programmation"
import NationMap from "./pages/NationMap"
import Partenaires from "./pages/Partenaires"
import Contacts from "./pages/Contacts"


// Au démarrage, récupérer le panier du stockage local ou réinitialiser le panier.
function App() {
  //Structurer les pages de l'application
  return (
    <>
      {/* <PanierContext.Provider value={{ panier, setPanier }}>      */}
          <Header />
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/Programmation" element={<Programmation />}/>
                <Route path="/NationMap" element={<NationMap />}/>
                <Route path="/Partenaires" element={<Partenaires />}/>
                <Route path="/Contacts" element={<Contacts />}/>
            </Routes>
          <Footer />
      {/* </PanierContext.Provider> */}
    </>
  )
}

export default App