const express = require('express');
const path = require('path');
const userRouter = require('../routes/users');
const loginRouter = require('../routes/login');
const recipesRouter = require('../routes/recipes');
const error = require('../middlewares/error');

const app = express();

app.use(express.json());

// /images é o caminho/end-point da API onde as imagens estarão disponíveis
// path.join(__dirname, '..', 'uploads') é o caminho da pasta onde o multer deve salvar suas imagens ao realizar o upload

app.use('/', userRouter);
app.use('/', loginRouter);
app.use('/', recipesRouter);
app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));

app.use(error);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
