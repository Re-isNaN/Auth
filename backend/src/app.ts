import fastify, { FastifyReply, FastifyRequest } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'

import { AuthRoutes } from './routes/auth.router'
import { preHandlerVerifyAuth } from './middlewares/authVerify'

import { CustomErrType } from './errors/gerarErros'

import { envConfig } from './env/config'

export const app = fastify()

app.register(fastifyCors, {
  origin: ['http://localhost:3232'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  credentials: true,
})

app.register(fastifyJwt, {
  secret: envConfig.JWT_SECRET,
  verify: {
    extractToken: (req: FastifyRequest) => {
      return req.cookies.accessToken
    },
  },
  decode: { complete: true },
  sign: {
    expiresIn: '10h',
  },
})

app.register(fastifyCookie, { secret: envConfig.COOKIE_SECRET })

/**
 * @description HOOK PARA LIDAR COM ERROS INTERNOS
 */
app.setErrorHandler(
  async (
    error: CustomErrType,
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    try {
      console.log(error)

      /**
       * @description ERROS CONTROLADOS INTERNAMENTE
       */

      const customError = {
        isError: true,
        message: error.message,
        typeError: error.typeError,
        statusCode: error.statusCode,
      }

      reply.code(customError.statusCode).send(customError)
    } catch (err) {
      /**
       * @description PARA ERROS NAO CONTROLADOS INTERNAMENTE
       */

      const customErr = err as CustomErrType

      reply.code(500).send({
        isError: true,
        message:
          customErr.message || 'Erro interno na construção/lógica da aplicação',
        typeError: 'Erro do Servidor Interno',
        statusCode: 500,
      })
    }
  },
)

app.get('/', (req, reply) => {
  reply.send({ message: 'TESTE OK' })
})

app.get('/teste', { preHandler: preHandlerVerifyAuth }, async (req, reply) => {
  console.log(req.cookies)
  reply.send({ message: 'CONTEUDO DA REQUISICAO' })
})

app.register(AuthRoutes, { prefix: '/auth' })
