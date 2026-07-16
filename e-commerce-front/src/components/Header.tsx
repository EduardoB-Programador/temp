import '../styles/Header.css'
import logo from '../assets/shellshop-bgless.png'
import { isAdminLoggedIn, isLoggedIn } from '../utils/UserState'
import userImg from '../assets/userimg.png'
import { useCookies } from 'react-cookie'

export default function Header(props: { children?: React.JSX.Element }) {
    const [cookies] = useCookies(['token', 'stoken'])

    return (
        <div className='header'>
            <div className='lh'>
                <a href="/" id='img-link'>
                    <img src={logo} alt="" className='logo-img' />
                </a>
                <a href="/sobre" className='header-link'>sobre</a>
            </div>
            <div className='mh'>
                {props.children}
            </div>
            <div className='rh'>
                {!isLoggedIn(cookies) && (
                    <>
                        <a href="/login" className="header-link">Log in</a>
                        <a href="/sign" className="header-link">Sign in</a>
                    </>
                )}
                {isLoggedIn(cookies) &&
                    <>
                        {isAdminLoggedIn(cookies) && <a href='/admin/' className='header-link'>admin home</a>}
                        <a href='/me' className='header-link'><img id='user-img' src={userImg} /></a>
                    </>
                }
            </div>
        </div>
    )
}