const mongoose = require("mongoose");
const { UserSeeder } = require("./UserSeeder");
const { ProductSeeder } = require("./ProductSeeder");

const main = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/animalShelters");
        console.log("Database connected!");

        // Run Seeders
        await UserSeeder();
        await ProductSeeder();
        console.log(" Seeding completed");
    } catch (err) {
        console.log("Error during seeding: ", err);
    } finally {
        await mongoose.connection.close();
        console.log("Database connection Closed.");
    }
};

main();
