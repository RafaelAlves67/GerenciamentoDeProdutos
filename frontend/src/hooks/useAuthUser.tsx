import { useState, useEffect } from "react";

export default function useAuthUser() {
    const [authenticate, setAuthenticate] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
            if (token) {
                try {
                    fetch('http://localhost:3000', {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    setAuthenticate(true);
                    
                    
                } catch (error) {
                    console.log("Erro ao verificar token:", error);
                }
            }
    }, [])

    async function createUsers(name:string, email:string, password:string, confirmPassword:string) {
        let msg;
        const user = { name, email, password, confirmPassword };
        try {
            const res = await fetch('http://localhost:3000/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            if (res.ok) {
                const data = await res.json();
                msg = data.msg;
            } else {
                const errorData = await res.json();
                console.log("Erro na requisição: " + errorData.msg);
                msg = errorData.msg;
            }

            return msg;

        } catch (error) {
            console.log("Aconteceu o seguinte erro" + error);
        }
    }

    async function authLogin(email:string, password:string) {
        let msg;
        try {
            const res = await fetch('http://localhost:3000/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (res.ok) {
                const data = await res.json();
                const token = data.token;
                msg = data.msg;
                setAuthenticate(true)
                console.log(authenticate + "É no authLogin")
                await authUser(token)
            } else {
                const errorData = await res.json();
                msg = errorData.msg;
            }

            return msg;
        } catch (error) {
            console.log("Aconteceu o seguinte erro de requisição de Login: " + error);
        }
    }

    async function authUser(token:string){
        setAuthenticate(true)
        localStorage.setItem('token', token)
    }

    return { authenticate, setAuthenticate, createUsers, authLogin };
}
