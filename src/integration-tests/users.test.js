const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
const server  = require('../api/app');

const { getConnection } = require('./mongoMockConnection');
const { MongoClient } = require('mongodb');

describe('POST /users', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando o usuário é cadastrado com sucesso', () => {
    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'name-ok',
          email: 'test@example.com',
          password: 'password-ok'
        });
      });
      
    it('retorna código de status "201"', () => {
      expect(response).to.have.status(201);
    });
    
    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta deve possuir a propriedade "user"', () => {
      expect(response.body).to.be.an('object');
    });
    
    it('na propriedade "user" deve existir as propriedades "_id", "name" e "email"', () => {
      expect(response.body.user).to.have.property('_id');
      expect(response.body.user).to.have.property('name');
      expect(response.body.user).to.have.property('email');
    });

    it('na propriedade "user" deve existir a propriedade "role" com valor "user"', () => {
      expect(response.body.user).to.have.property('role');
      expect(response.body.user.role).to.be.equal('user');
    });

    it('o valor das propriedades "_id", "name", "email" e "role" deve ser uma "string"', () => {
      expect(response.body.user._id).to.be.a('string');
      expect(response.body.user.name).to.be.a('string');
      expect(response.body.user.email).to.be.a('string');
      expect(response.body.user.role).to.be.a('string');
    });
  });

  describe('Quando o usuário não é cadastrado com sucesso', () => {
    let response;

    it('retorna código de status "400" se o name não existir com a mensagem "Invalid entries. Try again."', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: 'test@example.com',
          password: 'password-ok'
        });
      
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });

    it('retorna código de status "400" se o email não existir com a mensagem "Invalid entries. Try again."', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'name-ok',
          password: 'password-ok'
        });
      
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });

    it('retorna código de status "400" se o name não existir com a mensagem "Invalid entries. Try again."', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'name-ok',
          email: 'test@example.com'
        });
      
      expect(response).to.have.status(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });

    it('retorna código de status "409" se o email já estiver cadastrado com a mensagem "Email already registered"', async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          name: 'name-ok',
          email: 'test@example.com',
          password: 'password-ok'
        });

      expect(response).to.have.status(409);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.equal('Email already registered');
    });
  });
});

/* describe('POST /users/admin', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  const TEST_ID = '658de6ded1dd479300cd6aa1';

  describe('Quando o usuário é cadastrado com sucesso', () => {
    let response;

    before(async () => {
      connectionMock.db('Cookmaster').collection('users').insertOne({
        _id: TEST_ID,
        name: 'name-ok',
        email: 'email@example.com',
        password: 'password-ok',
        role: 'admin'
      });

      const token = await chai
        .request(server)
        .post('/login')
        .send({
          email: 'email@example.com',
          password: 'password-ok'
        })
        .then((res) => res.body.token);
      
      response = await chai
        .request(server)
        .post('/users/admin')
        .send({
          name: 'admin',
          email: 'admin@example.com',
          password: 'admin123',
        })
        .set('authorization', token);
    });
      
    it('retorna código de status "201"', () => {
      expect(response).to.have.status(201);
    });
  });
}); */
