import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/SignIn.css'
import { usuario } from '../types/ModelTypes'
import SignContainer from '../components/SignContainer'
import { validateUser } from '../utils/ValidateCredentials'
import { BackResponse } from '../types/APITypes'
import { useNavigate } from 'react-router'

export default function SignIn() {
    const [credentialsSign, setCredentialsSign] = useState<usuario>()
    const [errorResponseMessage, setErrorResponseMessage] = useState<string>()
    const navigate = useNavigate()

    useEffect(() => {
        if (!credentialsSign)
            return
        if (!validateUser(credentialsSign))
            return

        const send = async () => {
            const result = await fetch('http://localhost:3000/usuario/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentialsSign)
            }).then(res => res.json()) as BackResponse
            console.log(result)

            if (result.status !== 'sucesso') {
                setErrorResponseMessage(result.mensagem)
                return
            }
            navigate('/')
        }

        send()
    }, [credentialsSign, navigate])

    return (
        <>
            <Header />
            <SignContainer set={setCredentialsSign} errorMessage={errorResponseMessage} />
            <Footer />
        </>
    )
}