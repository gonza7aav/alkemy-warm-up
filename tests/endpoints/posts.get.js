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

        let isDescendingSorted = true;
        let previousDate = new Date(res.body[0].creationDate);
        for (let i = 0; i < res.body.length; i++) {
          assert.property(res.body[i], 'id');
          assert.property(res.body[i], 'title');
          assert.property(res.body[i], 'image');
          assert.property(res.body[i], 'Category');
          assert.property(res.body[i], 'creationDate');

          let currentDate = new Date(res.body[i].creationDate);
          if (currentDate.getTime() > previousDate.getTime()) {
            isDescendingSorted = false;
          }

          previousDate = currentDate;
        }

        assert.isTrue(isDescendingSorted, 'expected to be descending sorted');

        done();
      });
  });
});
