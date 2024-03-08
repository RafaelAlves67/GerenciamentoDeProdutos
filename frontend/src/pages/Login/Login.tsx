import { useState } from "react"
import "./Login.css"
import  useAuthUser  from "../../hooks/useAuthUser"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import context from "../../context/auth"

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const {authLogin} = useAuthUser()

  const {login} = useContext(context)

  const Navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!email || !password){
      return setMsg('Os campos de email e/ou senha não podem ficar vazios!')
    }
    const msg = await authLogin(email,password)

    if(msg === 'Usuário logado com sucesso'){
      setEmail("")
      setPassword("")
      login();
      
      setTimeout(() => {
        Navigate('/')
      }, 1000)
      return setMsg(msg)
  }
    if(msg){
      return setMsg(msg)
    }
  }

  return (
    <div>
        <h1 className='titulo-login'>Faça Login</h1>
        <form onSubmit={handleSubmit} className='form-login'>
            <label htmlFor="">E-mail</label>
            <input type="email" placeholder='Insira seu email' onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="">Senha</label>
            <input type="password" placeholder='Insira sua senha' onChange={(e) => setPassword(e.target.value)}/>

            <button type='submit' className='btn btn-primary'>Entrar</button>
            {msg && <p>{msg}</p>}
        </form>
    </div>
  )
}

export default Login