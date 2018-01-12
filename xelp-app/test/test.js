const assert = require('assert');
const axios = require('axios');

require('dotenv').config();

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

const baseUrl = `http://localhost:${process.env.PORT}`;

describe('GET /3restaurants', () => {
  it('responds with a status code of 200', (done) => {
    axios.get(`${baseUrl}/3restaurants`)
      .then((response) => {
        assert.equal(response.status, 200);
        console.log('response:', response);
        // expect(response.status).to.equal(200);
        done();
      })
      .catch((err) => {
        console.log('There was an error requesting / from the server', err);
      });
  });
});
