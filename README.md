## Desafio Full-stack

## Tecnologias utilizadas:

- NodeJs
- Reactjs
- Typeorm
- Typescript
- PostgreSQL

## Passos para instalação:

1. Clone o repositório na sua maquina local
2. Acesse a pasta de back-end e configure o arquivo .env com seus dados do postgres
3. Instale as dependências utilizando: `yarn install`
4. Execute as migrations com o comando: `yarn typeorm migration:run -d src/data-source.ts`
5. Rode o servidor back end com o comando: `yarn dev`
6. Acesse a pasta de front end e instale as dependências utilizando: `yarn install`
7. Com as dependências podemos rodar a aplicação utilizando: `yarn dev`

## Implementações a serem feitas:

- Melhorar documentação
- Bugfix testes
- Implementar a visualização de contatos e clientes na dashboard do front-end
- Dockerização
