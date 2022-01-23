const express = require('express');
const path = require('path');
const userRouter = require('../routes/users');
const loginRouter = require('../routes/login');
const recipesRouter = require('../routes/recipes');
const error = require('../middlewares/error');

const app = express();

app.use('/images', express.static(path.join(__dirname, '..', '/uploads')));

app.use(express.json());
app.use('/', userRouter);
app.use('/', loginRouter);
app.use('/', recipesRouter);

app.use(error);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
