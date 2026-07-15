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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path='/' />
        <Route element={<Login />} path='/login' />
        <Route element={<SignIn />} path='/sign' />

        <Route element={<Home />} path='/admin/' />
        <Route element={<AdminLog />} path='/admin/login' />
        <Route element={<AdminSign />} path='/admin/sign' />

        <Route element={<Sobre />} path='/sobre' />

        <Route element={<ErrorPage />} path='*'/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

//Header.tsx
//Header.css

//MainContent.tsx
//MainContent.css

//Footer.tsx
//Footer.css