require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const Server = require('../../controllers/Server');

const assert = chai.assert;

chai.use(chaiHttp);

describe('GET /posts/:id', () => {
  let fakeServer;

  before(async () => {
    fakeServer = new Server();
    await fakeServer.start();
  });

  it('Invalid Search', (done) => {
    chai
      .request(fakeServer.netServer)
      .get('/posts/a')
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 400);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The post id isn't valid");
        done();
      });
  });

  it("Search (won't find)", (done) => {
    chai
      .request(fakeServer.netServer)
      .get('/posts/0')
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 404);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The post wasn't found");
        done();
      });
  });

  it('Search', (done) => {
    chai
      .request(fakeServer.netServer)
      .get('/posts/1')
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.property(res.body, 'id');
        assert.property(res.body, 'title');
        assert.property(res.body, 'content');
        assert.property(res.body, 'image');
        assert.property(res.body, 'category');
        assert.property(res.body, 'creationDate');
        done();
      });
  });
});
