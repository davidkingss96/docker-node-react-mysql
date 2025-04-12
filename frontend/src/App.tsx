import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import './App.css'

function App() {

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Footer />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
