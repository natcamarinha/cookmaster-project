const express = require('express');
const userRouter = require('../routes/users');
const error = require('../middlewares/error');

const app = express();

app.use(express.json());
app.use('/', userRouter);

app.use(error);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
