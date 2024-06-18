import axios, { AxiosError } from 'axios'
import { fluxoAutenticacoAxios } from '../middlewares/handleAuth'
import { CustomErrType } from '../@types/errors'

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  withCredentials: true,
})

api.interceptors.response.use(
  function (config) {
    return config
  },

  async (error: AxiosError) => {
    const dadosErro = error.response?.data as CustomErrType

    console.log(error)

    if (error.code === 'ERR_NETWORK') {
      if (!window.location.pathname.includes('/login')) {
        window.location.assign('/login')
      }

      throw new Error('Erro na comunicação do servidor')
    }

    if (dadosErro.statusCode === 401) {
      console.log(error)

      return await fluxoAutenticacoAxios(error)
    }

    throw new Error(dadosErro.typeError)
  },
)
