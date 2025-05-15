import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import GrandmastersPage from './pages/GrandmastersPage';
import GrandmasterProfilePage from './pages/GrandmasterProfilePage';
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <Dashboard>
        <Header />
       
          {/* Example GrandmasterCard usage */}
          {/* TODO: Add Search bar, Add pagination, reestructure UI cards in a, add sort newest, order alphabetically,  breadcumb, etc */}
           <Routes>
          <Route path="/" element={<GrandmastersPage />} />
          <Route path="/grandmaster/:username" element={<GrandmasterProfilePage />} />
        </Routes>
      
        <Footer />
      </Dashboard>


    </Router>
  )
}

export default App
