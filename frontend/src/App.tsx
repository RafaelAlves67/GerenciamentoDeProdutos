import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

// pages
import Home from './pages/Home'
import Login from './pages/Login/Login'
import About from './pages/About'
import Register from './pages/Register/Register'
import Products from './pages/Products'

// components
import Nav from './components/Nav'


function App() {
  
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
