const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('API Endpoints', () => {
  // Test /register endpoint
  describe('/POST register', () => {
    it('it should register a user', (done) => {
      let user = {
        name: 'Test User',
        email: 'testuser@gmail.com',
        password: 'password',
      };
      chai
        .request(server)
        .post('/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('ok');
          res.body.should.have.property('message').eql('register successfuly');
          done();
        });
    });
  });

  // Add more tests as needed for other endpoints
});
