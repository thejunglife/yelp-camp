const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //Your user id
      author: '619dc4769c7ce9e0209f281a',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price,
      geometry: { type: 'Point', 
      coordinates: [ 
        cities[random1000].longitude,
        cities[random1000].latitude
       ] },
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus facere minima praesentium a asperiores, at sed sint quasi adipisci veniam id quibusdam expedita sequi eum, sapiente eveniet! Accusantium, nisi autem.',
      images: [
    {
      url: 'https://res.cloudinary.com/dr9msqikj/image/upload/v1640927030/YelpCamp/xpfpjrj2ebeprmbxlkg8.jpg',
      filename: 'YelpCamp/xpfpjrj2ebeprmbxlkg8',
    },
    {
      url: 'https://res.cloudinary.com/dr9msqikj/image/upload/v1640927609/YelpCamp/synsdfy3tz3k6y8679m6.jpg',
      filename: 'YelpCamp/synsdfy3tz3k6y8679m6',
    }
  ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})