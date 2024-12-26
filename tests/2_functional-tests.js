const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const assert = chai.assert;

chai.use(chaiHttp);

suite('Functional Tests', function() {

    test('Convierte una entrada válida como 10L: petición GET a /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
  });

  test('Convierte una entrada inválida como 32g: petición GET a /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initUnit, undefined);
        done();
      });
  });

  test('Convierte un número inválido como 3/7.2/4kg: petición GET a /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, undefined);
        done();
      });
  });

  test('Convierte un número Y una unidad no válidos como 3/7.2/4kilomegagram: petición GET a /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, undefined);
        assert.equal(res.body.initUnit, undefined);
        done();
      });
  });

  test('Convierte sin número tal como kg: petición GET a /api/convert', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.equal(res.body.returnUnit, 'lbs');
        done();
      });
  });
});

