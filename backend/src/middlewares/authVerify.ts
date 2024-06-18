import { CustomError } from '@/errors/gerarErros'
import { FastifyReply, FastifyRequest } from 'fastify'

export interface JWTType {
  id: number
  nome: string
  iat: number
  exp: number
}

export async function preHandlerVerifyAuth(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const infoToken = (await req.jwtVerify({ onlyCookie: true })) as JWTType

    reply.setCookie('id', infoToken.id.toString(), {
      path: '/',
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      signed: true,
    })
  } catch (err) {
    throw new CustomError({
      message: 'Erro ao verificar token',
      statusCode: 401,
      local: 'middlewares/auth preHandlerVerifyAuth',
      typeError: 'Erro token de acesso invalido',
    })
  }
}
