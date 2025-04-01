import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Login from '../screens/Login'
import Home from '../screens/Home'
import Projects from '../screens/Projects'
import Register from '../screens/Register'
import UserAuth from '../auth/UserAuth'

const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<UserAuth><Home /></UserAuth>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/projects" element={<UserAuth><Projects /></UserAuth>} /> */}
                <Route path="/projects" element={<Projects />} />
            </Routes>

        </BrowserRouter>
    )
}

export default AppRoutes