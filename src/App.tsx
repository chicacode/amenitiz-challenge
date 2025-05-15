import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import GrandmasterCard from './components/GrandmasterCard'
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
            <Route
              path="/"
              element={
                <GrandmasterCard
                  playerId={1}
                  id={1}
                  name="Geri"
                  url="https://example.com"
                  userName="Geri"
                  followers={100}
                  last_online={1625256000}
                  joined={1625156000}
                  status="active"
                  isStreamer={true}
                  verified={true}
                  league="Grandmaster"
                  country="USA"
                  avatar="https://example.com/avatar.png"
                />
              }
            />
            
          </Routes>
        </div>
        <Footer />
      </Dashboard>


    </Router>
  )
}

export default App
