import { envConfig } from '@/env/config'
import { CustomError } from '@/errors/gerarErros'
import fastifyCookie from '@fastify/cookie'
import { FastifyRequest } from 'fastify'
import { JWTType } from './authVerify'

export async function cookieIdDecode(req: FastifyRequest) {
  try {
    const signedValue = req.cookies.id!

    const { value: uuid } = fastifyCookie.unsign(
      signedValue,
      envConfig.COOKIE_SECRET,
    )

    return uuid
  } catch (err) {
    return null
  }
}

export async function idUsuario(req: FastifyRequest) {
  try {
    let id: string | null = null

    const idCookie = await cookieIdDecode(req)

    if (idCookie !== null) {
      id = idCookie
    }

    if (!id) {
      const infoAccessToken = (await req.jwtVerify({
        onlyCookie: true,
      })) as JWTType | null

      const idToken = infoAccessToken?.id

      if (idToken) {
        id = idToken.toString()
      }
    }

    if (!id) {
      throw new Error()
    }

    // Retorna o ID convertido para um número inteiro
    return parseInt(id)
  } catch (err) {
    throw new CustomError({
      message: 'ID nao encontrado nos dados enviados',
      statusCode: 409,
      local: 'middlewares/cookie.id.decode  tentarIdUsuario()',
      typeError: 'Erro nos dados enviados',
    })
  }
}
