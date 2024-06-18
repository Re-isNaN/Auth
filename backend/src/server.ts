import { app } from './app'
import { envConfig } from './env/config'

app.listen({ port: envConfig.PORT, host: '0.0.0.0' }, (err) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err)
    process.exit(1)
  }

  console.log('Servidor em execução na porta ' + envConfig.PORT)
})
