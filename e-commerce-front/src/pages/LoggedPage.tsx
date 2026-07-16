import { Base64 } from 'js-base64'
import Footer from '../components/Footer'
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import '../styles/LoggedPage.css'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { isAdmin, isLoggedIn } from '../utils/UserState'
import { admin, usuario } from '../types/ModelTypes'
import DisplayCredentials from '../components/DisplayCredentials'
import { validateAdmin, validateUser } from '../utils/ValidateCredentials'
import { setNewCookie } from '../utils/CookiesUtils'

export default function LoggedPage() {
    const [cookies, setCookies, removeCookies] = useCookies(['user', 'admin', 'token', 'stoken'])
    const [credentials, setCredentials] = useState<usuario | admin>()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(credentials)
        if (!credentials)
            return

        if (isAdmin(credentials)) {
            if (!validateAdmin(credentials))
                return

            const send = async () => {
                const res = await fetch('http://localhost:3000/admin/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization-Special': cookies.stoken!
                    },
                    body: JSON.stringify(credentials)
                }).then(res => res.json())
                console.log(res)

                setNewCookie('admin', credentials, setCookies)
            }

            send()
        } else {
            if (!validateUser(credentials))
                return

            const send = async () => {
                const res = await fetch('http://localhost:3000/usuario/update', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': cookies.token!
                    },
                    body: JSON.stringify(credentials)
                }).then(res => res.json())
                console.log(res)

                setNewCookie('user', credentials, setCookies)
            }

            send()
        }

        console.log(credentials)
    }, [credentials, cookies, setCookies])

    useEffect(() => {
        if (!cookies) {
            navigate('/')
            return
        }

        if (!isLoggedIn(cookies)) {
            navigate('/')
            return
        }

        const payload = JSON.parse(Base64.decode(cookies.admin || cookies.user)) as admin | usuario
        setCredentials(payload)
    }, [cookies, navigate])


    return (
        <>
            <Header />
            <MainContent>
                <DisplayCredentials payload={credentials} set={setCredentials} removeCookies={removeCookies} />
            </MainContent>
            <Footer />
        </>
    )
}