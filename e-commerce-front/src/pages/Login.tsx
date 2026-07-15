import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/Login.css'
import { usuario } from '../types/ModelTypes'
import LoginContainer from '../components/LoginContainer'
import { validateUser } from '../utils/ValidateCredentials'
import { BackResponse } from '../types/APITypes'
import { useNavigate } from 'react-router'
import { useCookies } from 'react-cookie'

export default function Login() {
    const [credentialsLog, setCredentialsLog] = useState<usuario>()
    const [errorResponseMessage, setErrorResponseMessage] = useState<string>()
    const navigate = useNavigate()
    const [, setCookie] = useCookies(['token'])

    useEffect(() => {
        if (!credentialsLog)
            return
        if (!validateUser(credentialsLog))
            return

        const send = async () => {
            const res = await fetch('http://localhost:3000/usuario/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentialsLog)
            }).then(res => res.json()) as BackResponse
            console.log(res)

            if (res.status !== 'sucesso') {
                setErrorResponseMessage(res.mensagem)
                return
            }

            setCookie('token', res.token, {
                path: '/',
                maxAge: 86400
            })

            navigate('/')
        }

        send()
    }, [credentialsLog, navigate, setCookie])

    return (
        <>
            <Header />
            <LoginContainer set={setCredentialsLog} errorMessage={errorResponseMessage} />
            <Footer />
        </>
    )
}