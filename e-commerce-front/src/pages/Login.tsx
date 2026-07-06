import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/Login.css'
import { usuario } from '../types/ModelTypes'
import LoginContainer from '../components/LoginContainer'
import { validateUser } from '../utils/ValidateCredentials'

export default function Login() {
    const [credentialsLog, setCredentialsLog] = useState<usuario>()

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
            }).then(res => res.json())
            console.log(res)
        }

        send()
    }, [credentialsLog])

    return (
        <>
            <Header />
            <LoginContainer set={setCredentialsLog} operation='Log in' />
            <Footer />
        </>
    )
}