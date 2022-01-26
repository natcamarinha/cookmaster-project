const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
const server  = require('../api/app');

const { getConnection } = require('./mongoMockConnection');
const { MongoClient } = require('mongodb');

const jwt = require('jsonwebtoken');

describe('POST /login', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando o login é feito com sucesso', () => {
    let response;

    before(async () => {
      const users = {
        name: 'name-ok',
        email: 'email@example.com',
        password: 'password-ok'
      };
      
      const db = connectionMock.db('Cookmaster');
      await db.collection('users').insertOne(users);

      response = await chai.request(server)
        .post('/login')
        .send({
          name: 'name-ok',
          email: 'email@example.com',
          password: 'password-ok'
        });
    });

    it('retorna código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('deve possuir a propriedade token', () => {
      expect(response).to.be.an('object');
      expect(response.body).to.have.property('token');
    });

    it('o valor da propriedade token deve ser uma string', () => {
      expect(response.body.token).to.be.a('string');
    });

    it('a propriedade token deve conter um token JWT com o usuario usado no login no seu payload', () => {
      const token = response.body.token;
      const payload = jwt.decode(token);

      expect(payload.data.email).to.be.equal('email@example.com');
    });
  });
});
