const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create an array of usernames/emails
  const users = [
      {
          username: "fred",
          email: "fred@hotmail.com"
      },
      {
          username: "tony",
          email: "tony@gmail.com"
      }
  ];

  //create an array of thoughts/usernames
  const thoughts = [
      {
          thoughtText: "Many, many moons ago...",
          username: "Steve"
      },
      {
          thoughtText: "How many times must I ...",
          username: "Linda"
      }
  ]

  // Add usernames to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});