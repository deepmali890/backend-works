const Slider = require("../../models/slider");

const createSlider = async (req, res) => {
    try {
        const data = req.body;

        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }

        const dataToSave = new Slider(data);
        const response = await dataToSave.save();
        console.log(data)
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })

    }
}

const readSlider = async (req, res) => {
    try {
        const data = await Slider.find({ deleted_at: null })
        const filepath = `${req.protocol}://${req.get('host')}/slider-files/`
        res.status(200).json({ message: 'success', data, filepath})

    }
    catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error'})

    }
}

module.exports = {
    createSlider,
    readSlider
}