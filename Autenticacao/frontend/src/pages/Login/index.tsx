import { useState } from 'react'

import { IPropsComponentLogin } from './tipagens'

import { IAuthContext } from '../../@types/auth'
import { useAuth } from '../../contexts/AuthContext'
import { Loading } from '../../components/Loading'

/**
 * @decription Componente de Login
 * */
export function Login({ setAuthenticated }: IPropsComponentLogin) {
  const { login } = useAuth() as IAuthContext

  const [isLoading, setIsLoading] = useState(false)

  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')

  async function handleLogin() {
    setIsLoading(true)
    try {
      await login(nome, senha)

      setAuthenticated(true)
    } catch (error) {
      throw new Error(error as string)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
            <h1>LOGIN</h1>
            <input
                placeholder='Usuario'
                value={nome}
                onChange={(e) => setNome(e.target.value)} 
            />

            <input 
                placeholder='Senha' 
                type='password'
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />

            <button onClick={handleLogin}>
                Entrar
            </button>
        </div>
      )}
    </>
  )
}
