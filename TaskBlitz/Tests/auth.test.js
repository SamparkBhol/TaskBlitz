const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../backend/server');
const should = chai.should();

chai.use(chaiHttp);

describe('Auth', () => {
    it('should register a new user', (done) => {
        chai.request(server)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'password', role: 'user' })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('should login a user', (done) => {
        chai.request(server)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'password' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                done();
            });
    });
});
