import { useEffect, useState } from 'react'
import '../styles/AdminSign.css'
import { admin } from '../types/ModelTypes'
import { validateAdmin } from '../utils/ValidateCredentials'
import Header from '../components/Header'
import AdminSignContainer from '../components/AdminSignContainer'
import Footer from '../components/Footer'

export default function AdminSign() {
    const [credentialsSign, setCredentialsSign] = useState<admin | undefined>()

    useEffect(() => {
        if (!credentialsSign)
            return
        if (!validateAdmin(credentialsSign))
            return

        const send = async () => {
            const res = await fetch('http://localhost:3000/admin/add', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentialsSign)
            }).then(res => res.json())

            console.log(res)
        }

        send()
    }, [credentialsSign])

    return (
        <>
            <Header />
            <AdminSignContainer set={setCredentialsSign} />
            <Footer />
        </>
    )
}