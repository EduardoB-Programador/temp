import { useEffect, useState } from 'react'
import '../styles/AdminLog.css'
import { admin } from '../types/ModelTypes'
import { validateAdmin } from '../utils/ValidateCredentials'
import Header from '../components/Header'
import LoginContainer from '../components/LoginContainer'
import Footer from '../components/Footer'

//Pagina -> efetivamente é um React Component, mas é um componente completo que retorna outros componentes
export default function AdminLog() {
    const [credentialsLog, setCredentialsLog] = useState<admin | undefined>()

    useEffect(() => {
        if (!credentialsLog)
            return
        if (!validateAdmin(credentialsLog))
            return

        const send = async () => {
            const res = await fetch('http://localhost:3000/admin/login', {
                method: "POST",
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