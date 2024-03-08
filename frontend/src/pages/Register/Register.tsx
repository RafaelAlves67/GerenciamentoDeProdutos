import "./Register.css"
import { useState } from "react"
import  useAuthUser from "../../hooks/useAuthUser"
import { useNavigate } from "react-router-dom"

const Register = () => {

  const {createUsers} = useAuthUser()
  const Navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
     
    const msg = await createUsers(name,email,password, confirmPassword)

    if(msg === 'Usuário criado! Você será redirecionado para página de Login.'){
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setTimeout(() => {
        Navigate('/login')
      }, 2000)
      return setMsg(msg)
    }

    if(msg){
      return  setMsg(msg);
    }
  }

  return (
    <div>  
      <h1 className='titulo-register'>Crie sua conta</h1>
      <form className='form-register' onSubmit={handleSubmit}>

       
        <label htmlFor="">Nome</label>
        <input type="text" placeholder='Insira seu nome' value={name} onChange={(e) => setName(e.target.value)}/>
       
        

        <label className="label-register">E-mail</label>
        <input type="email" placeholder='Insira seu email' value={email} onChange={(e) => setEmail(e.target.value)}/>
      


        <label  className="label-register">Senha</label>
        <input type="password" placeholder='Insira sua senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
  


        <label  className="label-register">Confirme sua senha</label>
        <input type="password" placeholder='Insira sua senha novamente' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
       

        <button type="submit" className='btn btn-primary btn-register'>Cadastrar</button>
        {msg && <p className="p-error">{msg}</p>}
       
      </form>
    </div>
  )
}

export default Register