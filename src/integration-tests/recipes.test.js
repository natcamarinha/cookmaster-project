const chai = require('chai');
const sinon = require('sinon');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;
const server  = require('../api/app');

const { getConnection } = require('./mongoMockConnection');
const { MongoClient } = require('mongodb');

describe('POST /recipes', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  const TEST_ID = '658de6ded1dd479300cd6aa1';

  describe('Quando é possível cadastrar uma receita com login e token válidos', () => {
    let response;

    before(async () => {
      connectionMock.db('Cookmaster').collection('recipes').insertOne({
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
        .post('/recipes')
        .send({
          name: 'name-ok',
          ingredients: 'ingredients-ok',
          preparation: 'preparation-ok'
        })
        .set('authorization', token);
    });
 
    it('retorna código de status "201"', () => {
      expect(response).to.have.status(201);
    });
    
    it('retorna um objeto no body', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto de resposta deve possuir a propriedade "recipe"', () => {
      expect(response.body).to.have.property('recipe');
    });

    it('na propriedade "recipe" deve existir as propriedades "name", "ingredients", "preparation", "userId" e "_id"', () => {
      expect(response.body.recipe).to.have.property('name');
      expect(response.body.recipe).to.have.property('ingredients');
      expect(response.body.recipe).to.have.property('preparation');
      expect(response.body.recipe).to.have.property('userId');
      expect(response.body.recipe).to.have.property('_id');
    });

    it('o valor das propriedades "name", "ingredients", "preparation", "usedId" e "_id" deve ser uma "string"', () => {
      expect(response.body.recipe.name).to.be.a('string');
      expect(response.body.recipe.ingredients).to.be.a('string');
      expect(response.body.recipe.preparation).to.be.a('string');
      expect(response.body.recipe.userId).to.be.a('string');
      expect(response.body.recipe._id).to.be.a('string');
    });    
  });

  describe('Quando não é possível cadastrar uma receita sem um token válido', () => {
    let response;

    before(async () => {
      connectionMock.db('Cookmaster').collection('recipes').insertOne({
        _id: TEST_ID,
        name: 'name-ok',
        email: 'email@example.com',
        password: 'password-ok',
        role: 'admin'
      });

      const token = '';
      
      response = await chai
        .request(server)
        .post('/recipes')
        .send({
          name: 'name-ok',
          ingredients: 'ingredients-ok',
          preparation: 'preparation-ok'
        })
        .set('authorization', token);
    });

    it('retorna código de status "401"', () => {
      expect(response).to.have.status(401);
    });

    it('retorna um objeto no body', () => {
      expect(response).to.be.an('object');
    });

    it('objeto de resposta deve possuir a propriedade "message"', () => {
      expect(response).to.be.an('object');
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "missing auth token"', () => {
      expect(response.body.message).to.be.equal('missing auth token');
    });
  });

  describe('Quando não é possível cadastrar uma receita sem um dos campos obrigatórios', () => {
    let response;

    before(async () => {
      connectionMock.db('Cookmaster').collection('recipes').insertOne({
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
        .post('/recipes')
        .send({
          ingredients: 'ingredients-ok',
          preparation: 'preparation-ok'
        })
        .set('authorization', token);
    });

    it('retorna código de status "400"', () => {
      expect(response).to.have.status(400);
    });

    it('retorna um objeto no body', () => {
      expect(response).to.be.an('object');
    });

    it('objeto de resposta deve possuir a propriedade "message"', () => {
      expect(response).to.be.an('object');
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" tem o valor "Invalid entries. Try again."', () => {
      expect(response.body.message).to.be.equal('Invalid entries. Try again.');
    });
  });
});

describe('GET /recipes', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando é possível consultar a lista de receitas', () => {
    let response;

    before(async () => {
      connectionMock.db('Cookmaster').collection('recipes').insertMany([
        {
          _id: '61e88aa7152585d9a885f0bb',
          name: 'admin',
          ingredients: 'admin',
          preparation: 'admin',
          userId: '61e8649d8c3f1682e0d76081',
        },
        {
          _id: '61e88aa7152585d9a885f0bb',
          name: 'admin',
          ingredients: 'admin',
          preparation: 'admin',
          userId: '61e8649d8c3f1682e0d76081',
        },
      ]);

      response = await chai.request(server).get('/recipes');
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('array');
    });
  });
});

describe('GET /recipes/:id', () => {
  let connectionMock;
  
  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  
  after(() => {
    MongoClient.connect.restore();
  });

  describe('Quando é possível consultar uma receita com o id informado', () => {
    let response;

    before(async () => {
      const { insertedId } = await connectionMock
        .db('Cookmaster')
        .collection('recipes')
        .insertOne({
          name: 'admin',
          ingredients: 'admin',
          preparation: 'admin',
        });

      response = await chai.request(server).get(`/recipes/${insertedId}`);
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body).to.have.property('_id');
    });
  });

/*   describe('Quando não é possível consultar uma receita com o id inválido', () => {
    let response;

    before(async () => {
      connectionMock
        .db('Cookmaster')
        .collection('recipes')
        .insertOne({
          _id: '62e88aa7152585d9a885f0bb',
          name: 'admin',
          ingredients: 'admin',
          preparation: 'admin',
          userId: '61e8649d8c3f1682e0d76081',
        });

      response = await chai.request(server).get('/recipes/61e88aa7152585d9a885f0cc');
    });

    it('retorna o código de status 404', () => {
      expect(response).to.have.status(404);
    });
  }); */
});


