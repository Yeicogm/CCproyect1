const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {

    test('convertHandler debería leer correctamente una entrada de número entero.', function(done) {
    const input = '32L';
    assert.equal(convertHandler.getNum(input), 32);
    done();
  });

  test('convertHandler debería leer correctamente una entrada de número decimal.', function(done) {
    const input = '32.5L';
    assert.equal(convertHandler.getNum(input), 32.5);
    done();
  });

  test('convertHandler debería leer correctamente una entrada fraccional.', function(done) {
    const input = '1/2L';
    assert.equal(convertHandler.getNum(input), 0.5);
    done();
  });

  test('convertHandler debería leer correctamente una entrada fraccional con un decimal.', function(done) {
    const input = '3.5/7L';
    assert.equal(convertHandler.getNum(input), 0.5);
    done();
  });

  test('convertHandler debería devolver correctamente un error en una fracción doble (i.e. 3/2/3).', function(done) {
    const input = '3/2/3L';
    assert.equal(convertHandler.getNum(input), undefined);
    done();
  });

  test('convertHandler debería predeterminar correctamente una entrada numérica de 1 cuando no se proporciona ninguna entrada numérica.', function(done) {
    const input = 'L';
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });

  test('convertHandler debería leer correctamente cada unidad de las entradas válidas.', function(done) {
    const input = '32L';
    assert.equal(convertHandler.getUnit(input), 'L');
    done();
  });

  test('convertHandler debería devolver correctamente un error por cada unidad de entrada no válida.', function(done) {
    const input = '32g';
    assert.equal(convertHandler.getUnit(input), undefined);
    done();
  });

  test('convertHandler debería devolver la unidad de retorno correcta para cada unidad de entrada válida.', function(done) {
    const input = 'gal';
    assert.equal(convertHandler.getReturnUnit(input), 'L');
    done();
  });

  test('convertHandler debería devolver correctamente la unidad de cadena deletreada para cada unidad de entrada válida.', function(done) {
    const input = 'gal';
    assert.equal(convertHandler.spellOutUnit(input), 'gallons');
    done();
  });

  test('convertHandler debe convertir correctamente gal a L.', function(done) {
    const input = [5, 'gal'];
    const expected = 18.9271;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  test('convertHandler debe convertir correctamente L a gal.', function(done) {
    const input = [18.9271, 'L'];
    const expected = 5;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  test('convertHandler debería convertir correctamente mi a km.', function(done) {
    const input = [1, 'mi'];
    const expected = 1.60934;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  test('convertHandler debería convertir correctamente km a mi.', function(done) {
    const input = [1.60934, 'km'];
    const expected = 1;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  test('convertHandler debería convertir correctamente lbs a kg.', function(done) {
    const input = [1, 'lbs'];
    const expected = 0.453592;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });

  test('convertHandler debería convertir correctamente kg a lbs.', function(done) {
    const input = [0.453592, 'kg'];
    const expected = 1;
    assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
    done();
  });
});
