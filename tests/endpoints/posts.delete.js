require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const Server = require('../../controllers/Server');

const assert = chai.assert;

chai.use(chaiHttp);

describe('DELETE /posts/:id', () => {
  let fakeServer;

  before(async () => {
    fakeServer = new Server();
    await fakeServer.start();
  });

  it('Invalid id', (done) => {
    chai
      .request(fakeServer.netServer)
      .delete('/posts/a')
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 400);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The post id isn't valid");
        done();
      });
  });

  it("Id (won't find)", (done) => {
    chai
      .request(fakeServer.netServer)
      .delete('/posts/0')
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 404);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The post wasn't found");
        done();
      });
  });

  it('Valid', (done) => {
    chai
      .request(fakeServer.netServer)
      .delete('/posts/1')
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        done();
      });
  });
});
