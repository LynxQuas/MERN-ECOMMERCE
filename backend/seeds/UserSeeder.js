const User = require("../models/userModel");

const UserSeeder = async () => {
    try {
        await User.deleteMany({});
        console.log("All users deleted");

        const users = [
            {
                firstName: "Emily",
                lastName: "Brons",
                password: "321",
                email: "emily@test.com",
                profileImage:
                    "https://mighty.tools/mockmind-api/content/human/44.jpg",
            },
            {
                firstName: "La",
                lastName: "Pyae",
                password: "321",
                email: "lapyae@test.com",
                profileImage:
                    "https://mighty.tools/mockmind-api/content/human/5.jpg",
            },
            {
                firstName: "Julia",
                lastName: "Sun",
                password: "321",
                email: "julia@test.com",
                profileImage:
                    "https://mighty.tools/mockmind-api/content/human/43.jpg",
            },
            {
                firstName: "Timmy",
                lastName: "Bruce",
                password: "321",
                email: "timmy@test.com",
                profileImage:
                    "https://mighty.tools/mockmind-api/content/human/9.jpg",
            },
            {
                firstName: "Foo",
                lastName: "jame",
                password: "321",
                email: "foo@test.com",
                profileImage:
                    "https://mighty.tools/mockmind-api/content/cartoon/7.jpg",
            },
        ];

        await User.insertMany(users);
        console.log("User seeding done.");
    } catch (e) {
        console.log("Error during user seeding: ", e);
    }
};

module.exports = { UserSeeder };
