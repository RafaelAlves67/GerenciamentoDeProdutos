import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { configDotenv } from "dotenv";
configDotenv()

import jwt from 'jsonwebtoken'
const secret = process.env.SECRET


export class UserController {
    static async getUsers(req,res){
        const users = await User.find();

        if(users.length === 0){
            return res.status(404).json({msg: "Nenhum usuário encontrado"})
        }

        return res.status(200).json(users)
    }

    static async createUser(req, res){
        const {name, email, password, confirmPassword} = req.body 

        if(!name){
            return res.status(404).json({msg: "O campo de nome não pode ficar vazio!"})
        }

        if(!email){
            return res.status(404).json({msg: "O campo de email não pode ficar vazio!"})
        }

        if(!password){
            return res.status(404).json({msg: "O campo de senha não pode ficar vazio!"})
        }

        const userExist = await User.findOne({email: email})

        if(userExist){
            return res.status(401).json({msg: "Email já cadastrado!"})
        }

        if(password !== confirmPassword){
            return res.status(404).json({msg: "As senhas de confirmação devem ser iguais!"})
        }

        const salt = 12;
        const HashPassword = await bcrypt.hash(password,salt)

        try{
            const newUser = new User({name,email,password:HashPassword})
            newUser.save();
            return res.status(200).json({msg: "Usuário criado! Você será redirecionado para página de Login."})
        }catch(error){
            console.log("Erro ao criar usuário:   =>" + error)
        }

    }

    // autenticação de usuário
    static async loginUser(req,res){
        const {email, password} = req.body 

        const user = await User.findOne({email: email})

        if(!user){
            return res.status(404).json({msg: "Usuário não encontrado!"})
        }

        const checkPassword = await bcrypt.compare(password, user.password) 

        if(checkPassword){
           const token = jwt.sign({id: user.id}, secret)

           return res.status(200).json({msg: "Usuário logado com sucesso", token})

        }else{
            return res.status(404).json({msg: "Senha incorreta!"})
        }
    }
}