import { FastifyInstance } from 'fastify'
import AuthControllers from '../api/controllers/auth/auth.controller'

export async function AuthRoutes(app: FastifyInstance) {
  app.post('/login', AuthControllers.login)

  app.put('/refresh', AuthControllers.refresh)

  app.put('/logout', AuthControllers.logout)
}
