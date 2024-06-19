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
graph TD;
    front[FRONTEND];
    back[BACKEND];
    login[Login];
    home[Home];
    state[Estado Autenticado];
    middlewareAuth[Middleware de Autenticação];
    rotaRefresh[Rota /auth/refresh];
    rota[Rota];
    accessToken[Access Token];
    verifyToken[Verificar Token];
    dados[Dados];

    front --- login;
    front --- middlewareAuth;
    back --- rota;
    back --- rotaRefresh;
    login --> state;
    state -->|true| home;
    home --> rota;
    state -->|false| login;
    middlewareAuth --> |Req| rotaRefresh;
    middlewareAuth --> |Reply OK| dados;
    middlewareAuth --> |Reply Erro -> Redirect| login;
    rotaRefresh -->|Reply| middlewareAuth;
    rota -->|Protegida| accessToken;
    rota -->|Desprotegida| dados;
    accessToken --> verifyToken;
    verifyToken -->|Erro access token invalido 401| middlewareAuth
    verifyToken --> |Válido| dados;
    dados --> |Reply| home;

          