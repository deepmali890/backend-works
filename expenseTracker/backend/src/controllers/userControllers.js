const User = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')



const register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        if (!fullname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false

            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false

            })
        }; 

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hashedPassword
        })

        res.status(200).json({ message: "Account Created Successfully.", success: true });

    }
    catch (error) {
        console.log(error)

        res.status(500).json({ message: "internal server error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false

            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false

            })
        };
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false

            })
        };
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, semSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user: {
                fullname: user.fullname,
                _id: user._id,
                email: user.email
            },
            success: true
        })



    }




    catch (error) {
        console.log(error)

        res.status(500).json({ message: "internal server error" });
    }
}

const logOut = async (req, res) => {
    try {
        res.status(200).cookie("token", "", { maxAge: 0 }).json({ message: "User Logged Out Successfully", success: true })
    }
    catch (error) {
        console.log(error)

        res.status(500).json({ message: "internal server error" });
    }
}

module.exports =
{
    register,
    login,
    logOut
}