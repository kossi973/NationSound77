import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Programmation from "./pages/Programmation"
import NationMap from "./pages/NationMap"
import Partenaires from "./pages/Partenaires"
import Contacts from "./pages/Contacts"
import MentionsLegales from "./pages/MentionsLegales"
import Faq from "./pages/Faq"
import WordPressData from "./pages/testwp"

function App() {
  //Structurer les pages de l'application
  return (
    <>
          <Header />
            <Routes >
                <Route path="/" element={<Home />} />
                <Route path="/Programmation" element={<Programmation />}/>
                <Route path="/NationMap" element={<NationMap />}/>
                <Route path="/Faq" element={<Faq />}/>
                <Route path="/Partenaires" element={<Partenaires />}/>
                <Route path="/Contacts" element={<Contacts />}/>
                <Route path="/MentionsLegales" element={<MentionsLegales />}/>
                <Route path="/WordPressData" element={<WordPressData />}/>
            </Routes>
          <Footer />
    </>
  )
}

export default App