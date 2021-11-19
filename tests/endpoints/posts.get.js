require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const Server = require('../../controllers/Server');

const assert = chai.assert;

chai.use(chaiHttp);

describe('GET /posts', () => {
  let fakeServer;

  before(async () => {
    fakeServer = new Server();
    await fakeServer.start();
  });

  it('List', (done) => {
    chai
      .request(fakeServer.netServer)
      .get('/posts')
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        // FIXME: orden
        res.body.forEach((x) => {
          assert.property(x, 'id');
          assert.property(x, 'title');
          assert.property(x, 'image');
          assert.property(x, 'category');
          assert.property(x, 'creationDate');
        });
        done();
      });
  });
});
