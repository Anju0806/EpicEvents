// seed.js
const { faker } = require('@faker-js/faker');
const connection = require('../config/connection');
const Product = require('../models/Product');
const Stall = require('../models/Stall');
const User = require('../models/User');
const Event = require('../models/Event');
const { generateProduct }  = require('./generateProductData');
const  sampleUsers  = require('./userSeeds.json');

// Start the seeding runtime timer
console.time('seeding..');

// Creates a connection to MongoDB
connection.once('open', async () => {
    try {
        // Delete the entries in the collections
        console.time('delete product..');
        await Product.deleteMany({});
        await Stall.deleteMany({});
        await Event.deleteMany({});
        await User.deleteMany({});

        // Sample data for events
        const sampleEvents = [];
        for (let i = 0; i < 10; i++) {
            const event = new Event({
                title: faker.word.sample(3),
                description: faker.lorem.sentence(),
                location: faker.location.city(),
                start_date: faker.date.future(),
                end_date: faker.date.future(),
                start_time: faker.date.future(),
                end_time: faker.date.future(),
                ticketInformation: faker.word.sample(5),
                max_stalls: faker.number.int({ min: 1, max: 50 }),
                createdBy: faker.database.mongodbObjectId(),
                image: faker.image.url(),
            });
            sampleEvents.push(event);
        }
        // Sample data for stalls
        const sampleStalls = [];
        for (let i = 0; i < 10; i++) {
            const stall = new Stall({
                title: faker.company.name(),
                description: faker.lorem.sentence(),
                number: faker.number.int({ min: 1, max: 100 }),
                contact_number: faker.phone.number(),
                image: faker.image.url(),
                owner: faker.database.mongodbObjectId()
            });
            sampleStalls.push(stall);
        }

         // Sample data for products
         const sampleProducts = [];
         for (let i = 0; i < 50; i++) {
             const product = generateProduct();
             sampleProducts.push(product);
         }

        // Insert the samples into the database
        await Stall.insertMany(sampleStalls);
        await Event.insertMany(sampleEvents);
        await User.insertMany(sampleUsers);
        await Product.insertMany(sampleProducts);

        // Logging a message indicating successful seeding
        console.log('Data seeding complete 🌱');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        // Close the MongoDB connection after seeding
        console.timeEnd('seeding');
        process.exit(0);
    }
});



