const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i<300; i++){
        const random1000 = Math.floor(Math.random() * 1000) +1;
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6385ec2655d05312f64399be',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam architecto veniam aliquam eum optio impedit, ipsa laborum suscipit molestiae. Deleniti amet obcaecati alias praesentium perspiciatis aspernatur ut, non laudantium iure.',
            price,
            geometry: {
                type :"Point", 
                coordinates :[
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images : [
                {
                  url: 'https://res.cloudinary.com/dempszpmg/image/upload/v1670243527/YelpCamp/rwvysrvwpxf8uicrsh07.jpg',
                  filename: 'YelpCamp/rwvysrvwpxf8uicrsh07'
                },
                {
                  url: 'https://res.cloudinary.com/dempszpmg/image/upload/v1670243528/YelpCamp/ibm7tiauaijermqblzkx.jpg',
                  filename: 'YelpCamp/ibm7tiauaijermqblzkx'
                }
              ]
        })
        await camp.save();        
    }   
}

seedDB().then(() => {
    mongoose.connection.close();
});