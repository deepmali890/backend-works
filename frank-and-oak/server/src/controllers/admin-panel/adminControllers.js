const Admin = require("../../models/admin")
const fs = require('fs')
const nodemailer = require('nodemailer')

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
        if (ifAdmin.password !== req.body.password) return res.status(401).json({ message: "invaild password" })

        const { password, ...data } = ifAdmin._doc;

        const filePath = `${req.protocol}://${req.get('host')}/web-filess/`

        res.status(200).json({ message: 'success', data, filePath })

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

        const data = req.body
        if (req.files) {
            if (req.files.logo) data.logo = req.files.logo[0].filename;
            if (req.files.fevicon) data.fevicon = req.files.fevicon[0].filename;
            if (req.files.footer_logo) data.footer_logo = req.files.footer_logo[0].filename;
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }

        const response = await Admin.updateOne(
            req.params,
            {
                $set: data
            }
        )
        res.status(200).json({ message: 'success', data: response })
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

        setTimeout(() => {  otpStore.delete(req.body.email)}, 120000)
       
        console.log(otp)

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD
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
        res.status(500).json({ massage: "internal server error" })
    }
}

const updateAdminEmail = async (req, res) => {
    try {
        const sentOtp =otpStore.get(req.body.email)

        if(!sentOtp) return  res.status(403).json({message:'Otp expired'})
        if(sentOtp !== Number (req.body.userOtp)) return res.status(401).json({message:'invaild Otp'})

            const data = await Admin.updateOne(
                { email: req.body.email },
                { $set: { email: req.body.newEmail } }
            )
        console.log(req.body)
        res.status(200).json({message:'success',data})
    }
    catch (error){
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
}


module.exports = {
    registerAdmin,
    loginAdmin,
    updateAdmin,
    generateOtp,
    updateAdminEmail
}