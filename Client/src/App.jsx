import { Outlet } from 'react-router'
import './App.css'
import Nav from './pages/landingPage/Nav'
import Footer from './pages/landingPage/Footer'

function App() {


  return (
    <>
     <Nav />
     <Outlet />
     <Footer />
    </>
  )
}

export default App
