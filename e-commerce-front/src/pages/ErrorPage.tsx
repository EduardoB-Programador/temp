import Footer from '../components/Footer'
import Header from '../components/Header'
import MainContent from '../components/MainContent'
import '../styles/ErrorPage.css'

export default function ErrorPage() {
    return (
        <>
            <Header />
            <MainContent>
                <div id="error-msg">
                    <h1>404 not found</h1>
                    <p>Ops! Parece que você tentou acessar uma pagina que não existe!</p>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlLkTBQ7BsVHLtG1qi6VHst2TmKIm1XbVMBaO0wjjNmg&s=10" alt="" />
                </div>
            </MainContent>
            <Footer />
        </>
    )
}