import { useCookies } from 'react-cookie'
import '../styles/AdminHome.css'
import { isAdminLoggedIn } from '../utils/UserState'
import { useNavigate } from 'react-router'
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import ProductForm from '../components/ProductForm'
import PaymentForm from '../components/PaymentForm'
import { Base64 } from 'js-base64'
import { admin } from '../types/ModelTypes'

export default function AdminHome() {
    const [cookies] = useCookies()
    const navigate = useNavigate()
    const [modalAberto, setModalAberto] = useState<'produto' | 'pagamento' | null>(null)
    const [adminId, setAdminId] = useState<number>()

    useEffect(() => {
        if (!isAdminLoggedIn(cookies)) {
            navigate('/')
            return
        }

        const payload = JSON.parse(Base64.decode(cookies.admin)) as admin
        setAdminId(payload.id)
    }, [cookies, navigate])

    return (
        <>
            <Header />
            <MainContent>
                <>
                    <div className="admin-actions">
                        <button type="button" onClick={() => setModalAberto('produto')}>
                            Adicionar Produto
                        </button>
                        <button type="button" onClick={() => setModalAberto('pagamento')}>
                            Adicionar Pagamento
                        </button>
                    </div>

                    <Modal isOpen={modalAberto === 'produto'} onClose={() => setModalAberto(null)}>
                        <ProductForm
                            stoken={cookies.stoken}
                            admId={adminId}
                            onSuccess={() => setModalAberto(null)}
                        />
                    </Modal>

                    <Modal isOpen={modalAberto === 'pagamento'} onClose={() => setModalAberto(null)}>
                        <PaymentForm
                            stoken={cookies.stoken}
                            onSuccess={() => setModalAberto(null)}
                        />
                    </Modal>
                </>
            </MainContent>
            <Footer />
        </>
    )
}