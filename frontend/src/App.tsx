import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Usuarios from './components/Usuarios/Usuarios'
import Productos from './components/Productos/Productos'
import './App.css'

function App() {

  return (
    <Router>
      <header className="App-header">
        <Header />
      </header>
      <div>
        <Routes>
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/productos" element={<Productos />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
