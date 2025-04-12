import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Usuarios from './components/Usuarios/Usuarios'
import './App.css'

function App() {

  return (
    <Router>
      <header className="App-header">
        <Header />
      </header>
      <div>
        <Routes>
          <Route path="/" element={<Footer />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
