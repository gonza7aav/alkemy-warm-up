/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

// This script will prepare the database for testing

if (process.env.NODE_ENV !== 'test') {
  throw new Error('This is not a test enviroment');
}

console.log('Starting the insertion of test data');

// Add the environment variables with dotenv
require('dotenv').config();

const Server = require('./controllers/Server');

const server = new Server();

// This will wait for x milliseconds
// Used to have different creationDate in posts
// eslint-disable-next-line no-promise-executor-return
const wait = (x) => new Promise((resolve) => setTimeout(() => resolve(), x));

(async () => {
  try {
    // Sync the database with the property force
    // this will drop the table if it's exists
    await server.database.sync({ force: true });

    const { Post, Category } = require('./models');

    const travel = await Category.create({ name: 'Travel' });
    const music = await Category.create({ name: 'Music' });

    let post = await Post.create({
      title: 'Visit to Old Trafford',
      content: 'We visit the home of Manchester United F.C.',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Manchester_United_Panorama_%288051523746%29.jpg/1280px-Manchester_United_Panorama_%288051523746%29.jpg',
      creationDate: new Date(),
    });

    await post.setCategory(travel);

    await wait(1000);

    post = await Post.create({
      title: 'Na zdraví',
      content:
        'We attended to Buenos Aires Celebra to celebrate the Czech culture',
      image:
        'https://scontent.fsfn4-1.fna.fbcdn.net/v/t39.30808-6/247291988_1753686531485320_6889930400300968147_n.jpg?_nc_cat=107&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=W-hxSQkKAD0AX-tLyMt&_nc_ht=scontent.fsfn4-1.fna&oh=c90b1e0ce16536d69d8dc4e4e51b2876&oe=619C05AC',
      creationDate: new Date(),
    });

    await post.setCategory(travel);

    await wait(1000);

    post = await Post.create({
      title: 'The anthem for victories',
      content:
        'This is the history of We are the Champions a song by the british rock band Queen',
      image:
        'https://upload.wikimedia.org/wikipedia/en/5/5a/Wearethechampions.jpg',
      creationDate: new Date(),
    });

    await post.setCategory(music);

    console.log('Insertion completed successfully');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
