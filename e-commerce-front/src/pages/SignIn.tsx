import { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/SignIn.css'
import { usuario } from '../types/ModelTypes'
import SignContainer from '../components/SignContainer'
import { validateUser } from '../utils/ValidateCredentials'

export default function SignIn() {
    const [credentialsSign, setCredentialsSign] = useState<usuario>()

    useEffect( () => {
        if (!credentialsSign)
            return
        if (!validateUser(credentialsSign))
            return
        
        const send = async () => {
            const result = await fetch('http://localhost:3000/usuario/add', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(credentialsSign)
            }).then(res => res.json())

            console.log(result)
        }

        send()
    }, [credentialsSign])

    return (
        <>
        <Header />
        <SignContainer set={setCredentialsSign} operation='Sign in'/>
        <Footer />
        </>
    )
}