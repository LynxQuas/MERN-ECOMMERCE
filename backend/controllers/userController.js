const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
};

const getUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found." });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ meessage: "Something went wrong." });
    }
};

const register = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirmation,
        profileImage,
        role,
    } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmation) {
        return res.status(400).json({ message: "Inputs could not be empty." });
    }

    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
        return res.status(400).json({ message: "User already exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    try {
        const user = new User({
            firstName,
            lastName,
            email,
            profileImage: profileImage || "",
            password: hashedPassword,
            role: role,
        });
        await user.save();
        res.status(201).json({ message: "User created successfully." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong try again." });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "email and password required!" });
        }

        const user = await User.findOne({ email });

        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                const token = jwt.sign(user.toObject(), process.env.JWT_SECRET);
                return res.status(200).json({ token, user });
            }
        }

        res.status(401).json({ message: "Invalid email or password" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong." });
    }
};

module.exports = {
    getAllUsers,
    register,
    login,
    getUser,
};
