const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../backend/server');
const should = chai.should();
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

describe('Tasks', () => {
    let token;

    before((done) => {
        token = jwt.sign({ userId: 'testid', role: 'user' }, 'secret_key');
        done();
    });

    it('should create a new task', (done) => {
        chai.request(server)
            .post('/api/tasks')
            .set('Authorization', token)
            .send({ title: 'Test Task', description: 'Test Description' })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('should get tasks', (done) => {
        chai.request(server)
            .get('/api/tasks')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });

    it('should update a task', (done) => {
        chai.request(server)
            .put('/api/tasks/1')
            .set('Authorization', token)
            .send({ status: 'completed' })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });

    it('should delete a task', (done) => {
        chai.request(server)
            .delete('/api/tasks/1')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(204);
                done();
            });
    });
});
