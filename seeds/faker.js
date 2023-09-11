const fs = require('fs');
const faker = require('faker');

function generateRandomUser() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const username = faker.internet.userName();
  const email = faker.internet.email();
  const password = 'password12345'; // common password

  return {
    first_name: firstName,
    last_name: lastName,
    username: username,
    email: email,
    password: password,
  };
}

function generateRandomPost(userId) {
  const title = faker.lorem.words(5);
  const content = faker.lorem.paragraphs(3);

  return {
    user_id: userId,
    title: title,
    content: content,
  };
}

function generateRandomReply(userId, postId) {
  const content = faker.lorem.sentences(1);

  return {
    user_id: userId,
    post_id: postId,
    content: content,
  };
}

const users = [];
const posts = [];
const replies = [];

// to generate 20 users
for (let i = 0; i < 20; i++) {
  const user = generateRandomUser();
  users.push(user);

  // to generate 5 posts for each user
  for (let j = 0; j < 5; j++) {
    const post = generateRandomPost(i + 1); // i + 1 represents the user_id
    posts.push(post);

    // Generate 3 replies for each post
    for (let k = 0; k < 3; k++) {
      const reply = generateRandomReply(i + 1, posts.length); // i + 1 represents the user_id, and posts.length represents the post_id
      replies.push(reply);
    }
  }
}

// converts the arrays of user, post, and reply objects to JSON
const usersJSON = JSON.stringify(users, null, 2);
const postsJSON = JSON.stringify(posts, null, 2);
const repliesJSON = JSON.stringify(replies, null, 2);

// defines the file paths to save the JSON files
const usersFilePath = __dirname + '/users.json';
const postsFilePath = __dirname + '/posts.json';
const repliesFilePath = __dirname + '/replies.json';

// Write the JSON data to the files
fs.writeFileSync(usersFilePath, usersJSON, 'utf-8');
fs.writeFileSync(postsFilePath, postsJSON, 'utf-8');
fs.writeFileSync(repliesFilePath, repliesJSON, 'utf-8');

console.log(`Users data saved to ${usersFilePath}`);
console.log(`Posts data saved to ${postsFilePath}`);
console.log(`Replies data saved to ${repliesFilePath}`);
