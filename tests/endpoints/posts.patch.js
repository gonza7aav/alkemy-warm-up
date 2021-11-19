require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const Server = require('../../controllers/Server');

const assert = chai.assert;

chai.use(chaiHttp);

describe('PATCH /posts/:id', () => {
  let fakeServer;

  before(async () => {
    fakeServer = new Server();
    await fakeServer.start();
  });

  it('No title', (done) => {
    chai
      .request(fakeServer.netServer)
      .patch('/posts/1')
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 400);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The title isn't valid");
        done();
      });
  });

  it('Empty title', (done) => {
    chai
      .request(fakeServer.netServer)
      .patch('/posts/1')
      .send({ title: '' })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 400);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The title isn't valid");
        done();
      });
  });

  it('No content', (done) => {
    chai
      .request(fakeServer.netServer)
      .patch('/posts/1')
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 400);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The content isn't valid");
        done();
      });
  });

  it('Empty content', (done) => {
    chai
      .request(fakeServer.netServer)
      .patch('/posts/1')
      .send({ content: '' })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 400);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The content isn't valid");
        done();
      });
  });

  it('Invalid image url', (done) => {
    chai
      .request(fakeServer.netServer)
      .patch('/posts')
      .send({ image: '' })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 400);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The image url isn't valid");
        done();
      });
  });

  it("Image (won't found)", (done) => {
    chai
      .request(fakeServer.netServer)
      .patch('/posts')
      .send({ image: 'http://localhost/' })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 404);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The image wasn't found");
        done();
      });
  });

  it('No category', (done) => {
    chai
      .request(fakeServer.netServer)
      .patch('/posts/1')
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 400);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The category isn't valid");
        done();
      });
  });

  it('Invalid category', (done) => {
    chai
      .request(fakeServer.netServer)
      .patch('/posts/1')
      .send({ category: 'a' })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 400);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The category isn't valid");
        done();
      });
  });

  it("Category (won't find)", (done) => {
    chai
      .request(fakeServer.netServer)
      .patch('/posts/1')
      .send({ category: 0 })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 404);
        assert.isArray(res.body.errors);
        assert.include(res.body.errors, "The category wasn't found");
        done();
      });
  });

  it('Invalid id', (done) => {
    chai
      .request(fakeServer.netServer)
      .patch('/posts/a')
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
      .patch('/posts/0')
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
      .patch('/posts/1')
      .send({
        title: 'test',
        content: 'test',
        category: 1,
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        done();
      });
  });
});
