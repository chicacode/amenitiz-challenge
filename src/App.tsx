import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header />
      <main className="p-4">
        <h2 className="text-xl font-semibold">Welcome to My Application</h2>
        <p className="mt-2">This is a simple application using React and TypeScript.</p>
      </main>  
      <Footer />           
    </>
  )
}

export default App
