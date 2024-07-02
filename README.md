# Quiz ProgWeb

Este é um projeto de quiz de perguntas e respostas desenvolvido utilizando NestJS para o backend, ReactJS para o frontend e MongoDB como banco de dados.

## Funcionalidades

- **Cadastro e Autenticação de Usuários**: Permite que usuários se cadastrem e façam login para acessar o quiz.
- **Quiz de Perguntas e Respostas**: Os usuários podem responder a perguntas de múltipla escolha em um quiz interativo.
- **Pontuação e Resultados**: Calcula e exibe a pontuação dos usuários após completarem o quiz.

## Tecnologias Utilizadas

- **Backend**: NestJS, TypeScript, MongoDB (usando Mongoose para ODM).
- **Frontend**: ReactJS, TypeScript, Material-UI para componentes visuais.
- **Autenticação**: JWT (JSON Web Tokens) para autenticação de usuários.

## Como executar:

- **Atenção: esse projeto funciona juntamente com o https://github.com/luishscarvalho/progweb-quiz-back, certifique-se que tenha os dois baixados no mesmo diretório e os devidos pacotes do node.js**

1. Crie um arquivo chamado .env. Nesse arquivo utilize o seguinte usuário:<br>
DB_USER=luishcarvalho<br>
DB_PASSWORD=torresmo123<br>
JWT_SECRET= _Gere qualquer token json web e adicione-o aqui_<br><br>
2. Utilizando o comando "npm start" inicie o backend
3. Após o inicio do backend, inicie o front-end com o comando "npm run dev" 
