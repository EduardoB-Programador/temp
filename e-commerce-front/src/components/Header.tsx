import '../styles/Header.css'
import logo from '../assets/shellshop-bgless.png'

export default function Header(props: {children?:React.JSX.Element}) {
    
    return (
        <div className='header'>
            <div className='lh'>
                <a href="/" id='img-link'>
                    <img src={logo} alt="" className='logo-img'/>
                </a>
                <a href="/sobre" className='header-link'>sobre</a>
            </div>
            <div className='mh'>
                {props.children}
            </div>
            <div className='rh'>
                <a href="/login" className="header-link">Log in</a>
                <a href="/sign" className="header-link">Sign in</a>
            </div>
        </div>
    )
}