/*seed in order:
skill
user
employer
job
message
*/

const seedSkills = require('./skill-seeds');
const seedUsers = require('./user-seeds');
const seedEmployers = require('./employer-seeds');
const seedJobs = require('./job-seeds');
const seedMessages = require('./message-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({force:true});
  console.log('-------------');
  await seedSkills();
  console.log('skills seeded');
  await seedUsers();
  console.log('users seeded');
  await seedEmployers();
  console.log('employers seedes');
  await seedJobs();
  console.log('jobs seeded');
  await seedMessages();
  console.log('All seeds complete');

  process.exit();
};

seedAll();