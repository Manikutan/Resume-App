// import Button from '@mui/material/Button';
// import { DiApple } from "react-icons/di";
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Landingpage from './pages/Landingpage';
import Resumegen from './pages/Resumegen';
import Forms from './pages/Forms';
import History from './pages/History';
import Pnff from './pages/Pnff';

function App() {
  // third party api - mui(material ui),react icon, react router dom, sweetalert, html2canvas, jspdf

  return (
    <>
    <Header/>
    <Routes>
      <Route path='' element =  {<Landingpage/>}/>
      <Route path='/resume-generator' element =  {<Resumegen/>}/>
      <Route path='/form' element =  {<Forms/>}/>
      <Route path='/history' element =  {<History/>}/>
      <Route path='/*' element =  {<Pnff/>}/>

    </Routes>
    <main>
      
    </main>
    <Footer/>
    </>
  )
}

export default App