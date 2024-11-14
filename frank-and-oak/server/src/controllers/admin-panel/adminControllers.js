const Admin = require("../../models/admin")
const fs = require('fs')

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

        const { password, email, ...data } = ifAdmin._doc;

        const filePath= `${req.protocol}://${req.get('host')}/web-filess/`

        res.status(200).json({ message: 'success', data,filePath })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })
    }
}

const updateAdmin = async (req, res) => {
    try {
        const ifAdmin =  await Admin.find(req.params)
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
                $set:data
            }
        )
        res.status(200).json({ message: 'success', data:response })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })
    }
}


module.exports = { registerAdmin, loginAdmin, updateAdmin }