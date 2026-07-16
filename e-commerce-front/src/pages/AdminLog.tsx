import { useEffect, useState } from 'react'
import '../styles/AdminLog.css'
import { admin } from '../types/ModelTypes'
import { validateAdmin } from '../utils/ValidateCredentials'
import Header from '../components/Header'
import LoginContainer from '../components/LoginContainer'
import Footer from '../components/Footer'
import { BackResponse } from '../types/APITypes'
import { useNavigate } from 'react-router'
import { useCookies } from 'react-cookie'
import { setNewCookie } from '../utils/CookiesUtils'

//Pagina -> efetivamente é um React Component, mas é um componente completo que retorna outros componentes
export default function AdminLog() {
    const [credentialsLog, setCredentialsLog] = useState<admin | undefined>()
    const [errorResponseMessage, setErrorResponseMessage] = useState<string>()
    const navigate = useNavigate()
    const [, setCookie] = useCookies(['user', 'admin', 'token', 'stoken'])

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
            }).then(res => res.json()) as BackResponse
            console.log(res)

            if (res.status !== 'sucesso') {
                setErrorResponseMessage(res.mensagem)
                return
            }

            setCookie('stoken', res.token, {
                path: '/',
                maxAge: 86400
            })

            setNewCookie('admin', res.info![0], setCookie)

            navigate('/admin/')
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