import { Link } from "react-router-dom"
import { useContext } from "react"
import context from "../context/auth"

import "./Nav.css"

const Nav = () => {

  const {authenticate, logout} = useContext(context)

  return (
    <nav>

        <img src="" alt="logo" />

        <div>
         <Link to="/">Home</Link> 
         <Link to="/about">Sobre nós</Link> 
         <Link to="/login">Entrar</Link>
         {authenticate ? (<><a onClick={logout}>Sair</a> </>) : (<Link to="/register">Cadastrar</Link>)} 
        </div>
    </nav>
  )
}

export default Nav