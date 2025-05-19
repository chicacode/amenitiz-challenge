import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import GrandmastersPage from './pages/GrandmastersPage'
import GrandmasterProfilePage from './pages/GrandmasterProfilePage'

const App: React.FC = () => {
  return (
  <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 ml-20 lg:ml-64">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<GrandmastersPage />} />
              <Route path="/grandmaster/:username" element={<GrandmasterProfilePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
