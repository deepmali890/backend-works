const Admin = require("../../models/admin")
const fs = require('fs')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const otpStore = new Map()

const registerAdmin = async (req, res) => {
    try {
        const ifAdmin = await Admin.find()

        if (ifAdmin.length !== 0) return console.log(ifAdmin[0])

        const newAdmin = new Admin({
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD

        });

        const data = await newAdmin.save();

        console.log(data)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

const loginAdmin = async (req, res) => {
    try {
        const ifAdmin = await Admin.findOne({ email: req.body.email })

        if (!ifAdmin) return res.status(403).json({ message: 'invaild email' })
        // if (ifAdmin.password !== req.body.password) return res.status(401).json({ message: "invaild password" })

        bcrypt.compare(req.body.password, ifAdmin.password, function (err, result) {
            if (err) return res.status(401).json({ message: "invaild password" })

            const { password, ...data } = ifAdmin._doc;

            const filePath = `${req.protocol}://${req.get('host')}/web-filess/`

            res.status(200).json({ message: 'success', data, filePath })
            // result == true
        });



    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

const updateAdmin = async (req, res) => {
    try {
        const ifAdmin = await Admin.find(req.params)
        if (!ifAdmin) return res.status(500).json({ message: 'Data Not Found' })

        if (fs.existsSync(`./src/uploads/admin/${ifAdmin.logo}`)) {
            fs.unlinkSync(`./src/uploads/admin/${ifAdmin.logo}`)
        }
        if (fs.existsSync(`./src/uploads/admin/${ifAdmin.fevicon}`)) {
            fs.unlinkSync(`./src/uploads/admin/${ifAdmin.fevicon}`)
        }
        if (fs.existsSync(`./src/uploads/admin/${ifAdmin.footer_logo}`)) {
            fs.unlinkSync(`./src/uploads/admin/${ifAdmin.footer_logo}`)
        }
        if (fs.existsSync(`./src/uploads/admin/${ifAdmin.thumbnail}`)) {
            fs.unlinkSync(`./src/uploads/admin/${ifAdmin.thumbnail}`)
        }

        console.log('update admin')

        const data = req.body
        if (req.files) {
            if (req.files.logo) data.logo = req.files.logo[0].filename;
            if (req.files.fevicon) data.fevicon = req.files.fevicon[0].filename;
            if (req.files.footer_logo) data.footer_logo = req.files.footer_logo[0].filename;
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }

        console.log(data)

        // const response = await Admin.updateOne(
        //     req.params,
        //     {
        //         $set: data
        //     }
        // )
        res.status(200).json({ message: 'success', data: 'response' })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

const generateOtp = async (req, res) => {
    try {
        console.log(req.body)

        const otp = Math.floor(Math.random() * 1000000)

        otpStore.set(req.body.email, otp)

        setTimeout(() => { otpStore.delete(req.body.email) }, 120000)

        console.log(otp)

        const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASS
            }
        })

        const options = {
            from: "no-reply@gmail.com",
            to: req.body.email,
            subject: "Email Update Request – Your OTP Code Inside",
            text: `


Dear [Dilip Mali],

To ensure the security of your account, please use the following One-Time Password (OTP) to verify and update your email address.

Your OTP Code: ${otp}

For your safety, this OTP is valid for the next 120 second. Do not share it with anyone. This email update is part of our ongoing commitment to keep your account secure and up-to-date. If you didn’t request this update, please contact our support team immediately.

Thank you for your attention and cooperation.

Best regards,
Frank and Oak Team`
        }
        transport.sendMail(options, (error, success) => {
            if (error) return res.status(501).json({ meaasge: 'try after some time' })
            res.status(200).json({ massage: "success" })

        })


    }
    catch (error) {
        console.log(error)
        res.status(500).json({ massage: "internal server error" })
    }
}

const updateAdminEmail = async (req, res) => {
    try {
        const sentOtp = otpStore.get(req.body.email)

        if (!sentOtp) return res.status(403).json({ message: 'Otp expired' })
        if (sentOtp !== Number(req.body.userOtp)) return res.status(401).json({ message: 'invaild Otp' })

        const data = await Admin.updateOne(
            { email: req.body.email },
            { $set: { email: req.body.newEmail } }
        )
        console.log(req.body)
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

const forgetPassword = async (req, res) => {
    try {


        const otp = Math.floor(Math.random() * 1000000)

        otpStore.set(req.body.email, otp)

        setTimeout(() => { otpStore.delete(req.body.email) }, 120000)

        console.log(otp)

        const ifAdmin = await Admin.findOne({ email: req.body.email })

        if (!ifAdmin) return res.status(403).json({ message: 'user Not Found' })








        const transport = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASS
            }
        })
        // const htmlContent=``

        // console.log(setToken)

        const token = jwt.sign({ _id: req.body._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        const setToken = await Admin.findByIdAndUpdate({ _id: ifAdmin._id }, { verifytoken: token }, { new: true })


        console.log(token)

        if (setToken) { }

        const options = {
            from: "no-reply@gmail.com",
            to: req.body.email,
            subject: "Urgent: Reset Your Password for Frank and Oak Admin Panel",
            html: `<!DOCTYPE html>
<html>
<head>
  <title>Password Reset</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333;">
  <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #0073e6;">Hello Dilip Mali,</h2>
    <p>We noticed a request to reset your password for the Frank and Oak Admin Panel. To proceed, click the link below and follow the instructions to securely update your password.</p>
    
    <p><strong>Please act quickly!</strong> The link will only be active for the next <strong>120 seconds</strong>:</p>
    <p style="text-align: center;">
    </p>
    
   <a href=" ${process.env.CLIENT_URL}/${ifAdmin.id}/${setToken.verifytoken}"><button style="background-color: skyblue; color: #ffff; padding: 12px 20px; text-decoration: none;">Reset Your Password</button></a>
    
    <h3>Why you should reset now:</h3>
    <p>Resetting your password promptly helps keep your account secure. Once you’ve completed this, your account will be protected by a new password of your choice.</p>
    
    <h3>Helpful Tips:</h3>
    <ul>
      <li>Use a password with letters, numbers, and symbols.</li>
      <li>Avoid easy-to-guess patterns like “password123” or your birthdate.</li>
    </ul>
    
    <p>If you didn’t make this request, no worries—just ignore this email. Your account will remain secure.</p>
    
    <p>Thank you,<br>The Frank and Oak Team</p>
  </div>
</body>
</html>`
            // text: `Click on this link to generate your password `

        }
        transport.sendMail(options, (error, success) => {
            if (error) return res.status(501).json({ meaasge: 'try after some time' })
            res.status(200).json({ massage: "success" })

        })


        // res.status(200).json({ massage: "success" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ massage: "internal server error" })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) return res.status(400).json({ message: 'please enter password' })

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const user = await Admin.findOne({ email: decode.email })

        const newhashPassword = await hashPassword(password)

        user.password = newhashPassword;

        await user.save();

        res.status(200).json({ message: 'success' })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

const finalPassword = async (req, res) => {
    const { id, token } = req.params;

    const { password, confirm_password } = req.body;

    try {

        const validUser = await Admin.findOne({ _id: id, verifytoken: token })
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if (!password === confirm_password) return res.status(401).json({ messsage: "please match password" })

        if (validUser && verifyToken) {

            const newpassword = await bcrypt.hash(password, 12)

            const setnewuserpassword = await Admin.findByIdAndUpdate({ _id: id }, { password: newpassword })

            setnewuserpassword.save();
            res.status(200).json({ message: "success", setnewuserpassword })

        } else {
            res.status(401).json({ status: 401, message: "user not exist" })
        }


    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}


module.exports = {
    registerAdmin,
    loginAdmin,
    updateAdmin,
    generateOtp,
    updateAdminEmail,
    forgetPassword,
    resetPassword,
    finalPassword
}

