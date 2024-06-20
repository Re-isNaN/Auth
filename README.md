# Auth

## Modelo de autenticação usando Node e React com typescript

### Descrição
Modelo de autenticação aplicando os conceitos de **Token** e **Refresh Token**, 
**Silent Refresh** e com um fluxo de autenticação **bem definido**.

### Ferramentas e Tecnologias
<div display='flex' flex-direction='row'>
    <a href='https://nodejs.org/en/about'>
        <img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" width="50px" height="50px"/>
    </a>
    <a href='https://react.dev/'>
        <img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" width="50px" height="50px"/>
    </a>
    <a href='https://www.typescriptlang.org/'>
        <img loading="lazy" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="50px" height="50px"/>
    </a>
</div>


### Principais Libs
[Axios](https://axios-http.com/ptbr/docs/intro) no FrontEnd.  
[Fastify](https://axios-http.com/ptbr/docs/intro) no BackEnd.


### Fluxo de Autenticação
```mermaid
sequenceDiagram
    participant CLIENTE
    participant SERVIDOR
    CLIENTE->>SERVIDOR: Enviar Access Token
    SERVIDOR->>SERVIDOR: Verifica Token
    alt Token Válido
        SERVIDOR-->>CLIENTE: Retorna Dados Normais
    else Token Inválido
        SERVIDOR-->>CLIENTE: Retorna Erro
        alt Tipo de Erro: Access Token Inválido
            CLIENTE->>SERVIDOR: Atualizar Token
        else Outro Tipo de Erro
            CLIENTE->>CLIENTE: Redireciona para Pagina Login
        end
    end

          