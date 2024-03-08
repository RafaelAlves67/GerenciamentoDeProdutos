export type User = {
    name: String,
    email: String,
    password: String,
    confirmPassword: String
}

export type Errors = {
    [key: string]: string
}

export const ValidateError = (name: String,email:String,password:String,confirmPassword:String) => {

    const Erros:Errors = {}

    if(!name){
        Erros['name'] = 'Preencha o campo de usuário.'
    }

    if(!email){
        Erros['email'] = 'Preencha o campo de email.'
    }

    if(!password){
        Erros['password'] = 'Preencha o campo de senha.'
    }

    if(!confirmPassword){
        Erros['confirmPassword'] = 'Preencha o campo de confirmação de senha.'
    }

    return Erros
}

