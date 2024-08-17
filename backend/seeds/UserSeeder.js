const User = require("../models/userModel");

const UserSeeder = async () => {
    try {
        await User.deleteMany({});
        console.log("All users deleted");

        const users = [
            {
                firstName: "Emily",
                lastName: "Brons",
                password: "123456",
                email: "emily@test.com",
                role: "customer",
                profileImage:
                    "https://mighty.tools/mockmind-api/content/human/44.jpg",
            },
            {
                firstName: "La Pyae",
                lastName: "Hmue Aung",
                password: "123456",
                role: "customer",
                email: "lapyae@test.com",
                profileImage:
                    "https://mighty.tools/mockmind-api/content/human/5.jpg",
            },

            {
                firstName: "Admin",
                lastName: "1",
                password: "123456",
                role: "admin",
                email: "admin@test.com",
                profileImage:
                    "https://mighty.tools/mockmind-api/content/human/5.jpg",
            },
        ];

        await User.insertMany(users);
        console.log("User seeding done.");
    } catch (e) {
        console.log("Error during user seeding: ", e);
    }
};

module.exports = { UserSeeder };
