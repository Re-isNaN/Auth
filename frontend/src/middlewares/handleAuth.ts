import { AxiosError } from 'axios'
import { api } from '../api/api'
import { CustomErrType } from '../@types/errors'

async function handleRefreshAuth(error: AxiosError) {
  try {
    const originalRequest = error.config

    const atualizouTokens = await api.put('/auth/refresh')

    if (originalRequest && atualizouTokens.data) {
      return await api(originalRequest)
    }
  } catch (err) {
    throw new Error('Erro ao atualizar credenciais de acesso')
  }
}

export async function fluxoAutenticacoAxios(error: AxiosError) {
  const dadosErro = error.response?.data as CustomErrType
  const pathname = window.location.pathname

  if (dadosErro.typeError === 'Erro token de acesso invalido') {
    return await handleRefreshAuth(error)
  }

  if (!pathname.includes('/login')) {
    window.location.assign('/login')
  }
}
