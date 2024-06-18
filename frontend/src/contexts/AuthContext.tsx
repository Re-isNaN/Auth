import { api } from '../api/api'

import { createContext, useContext, useState } from 'react'
import {
  IAuthContextDadosRecebidosServidor,
  TInfoUser,
} from './tipagens'
import { IPropsChildrenComponent } from '../@types/geral'

const authContext = createContext({})

export const useAuth = () => {
  return useContext(authContext)
}

export function AuthProvider({ children }: IPropsChildrenComponent) {
  const [user, setUser] = useState<TInfoUser>(() => {
    const userFromLocalStorage = localStorage.getItem('user')
    return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {}
  })

  const login = async (nome: string, senha: string) => {
    try {
      const authData: IAuthContextDadosRecebidosServidor['login'] =
        await api.post('/auth/login', {
          nome,
          senha,
        })

      localStorage.setItem('user', JSON.stringify(authData.data))

      if (!authData.data) {
        throw new Error('Erro usuario invalido')
      }

      setUser(authData?.data || {})

      return true
    } catch (err) {
      throw new Error(err as string)
    }
  }

  const logout = async () => {
    try {
      await api.put('/auth/logout')

      localStorage.removeItem('user')

      window.location.assign('/login')
    } catch (err) {
      throw new Error(err as string)
    }
  }

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  )
}
