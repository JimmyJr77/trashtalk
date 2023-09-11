const sequelize = require('../config/connection');
const { User, Post, Reply } = require('../models');
const userData = require('./users.json'); 
const postData = require('./posts.json'); 
const replyData = require('./replies.json'); 

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed users
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Seed posts
  await Post.bulkCreate(postData);

  // Seed replies
  await Reply.bulkCreate(replyData);

  process.exit(0);
};

seedDatabase();
