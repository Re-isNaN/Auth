import { Navigate, Route, Routes } from 'react-router-dom'

import { Login } from '../pages/Login'
import { Home } from '../pages/Home'

import { useState } from 'react'

export function Router() {
  const [authenticate, setAuthenticate] = useState<boolean>(false)

  return (
    <Routes>
        <Route
            path="/login"
            element={
                !authenticate ? (
            <Login setAuthenticated={setAuthenticate} />
                ) : (
             <Navigate to="/" />
                )
            }
        />

        <Route path="/" element={<Home />} />
    </Routes>
  )
}
