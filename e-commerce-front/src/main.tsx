import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home.tsx'
import Sobre from './pages/Sobre.tsx'
import Login from './pages/Login.tsx'
import SignIn from './pages/SignIn.tsx'
import AdminLog from './pages/AdminLog.tsx'
import AdminSign from './pages/AdminSign.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import { CookiesProvider } from 'react-cookie'
import AdminHome from './pages/AdminHome.tsx'
import LoggedPage from './pages/LoggedPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path='/' />
          <Route element={<Login />} path='/login' />
          <Route element={<SignIn />} path='/sign' />

          <Route element={<AdminHome />} path='/admin/' />
          <Route element={<AdminLog />} path='/admin/login' />
          <Route element={<AdminSign />} path='/admin/sign' />

          <Route element={<LoggedPage />} path='/me' />
          <Route element={<Sobre />} path='/sobre' />

          <Route element={<ErrorPage />} path='*'/>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  </StrictMode>
)

//Header.tsx
//Header.css

//MainContent.tsx
//MainContent.css

//Footer.tsx
//Footer.css