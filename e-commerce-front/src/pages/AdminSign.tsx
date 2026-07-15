import { useEffect, useState } from 'react'
import '../styles/AdminSign.css'
import { admin } from '../types/ModelTypes'
import { validateAdmin } from '../utils/ValidateCredentials'
import Header from '../components/Header'
import AdminSignContainer from '../components/AdminSignContainer'
import Footer from '../components/Footer'
import { BackResponse } from '../types/APITypes'
import { useNavigate } from 'react-router'
import { useCookies } from 'react-cookie'

export default function AdminSign() {
    const [credentialsSign, setCredentialsSign] = useState<admin | undefined>()
    const [errorResponseMessage, setErrorResponseMessage] = useState<string>()
    const navigate = useNavigate()
    const [cookies] = useCookies(['stoken'])

    useEffect(() => {
        if (!credentialsSign)
            return
        if (!validateAdmin(credentialsSign))
            return

        const send = async () => {
            const res = await fetch('http://localhost:3000/admin/add', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization-Special': cookies.stoken
                },
                body: JSON.stringify(credentialsSign)
            }).then(res => res.json()) as BackResponse
            console.log(res)

            if (res.status !== 'sucesso') {
                setErrorResponseMessage(res.mensagem)
                return
            }
            navigate('/')
        }

        send()
    }, [credentialsSign, navigate, cookies])

    return (
        <>
            <Header />
            <AdminSignContainer set={setCredentialsSign} errorMessage={errorResponseMessage} />
            <Footer />
        </>
    )
}