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
        <h1 className="text-2xl font-bold">Grandmaster Players</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Example GrandmasterCard usage */}
           <Routes>
          <Route path="/" element={<GrandmastersPage />} />
          <Route path="/grandmaster/:username" element={<GrandmasterProfilePage />} />
        </Routes>
        </div>
        <Footer />
      </Dashboard>


    </Router>
  )
}

export default App
