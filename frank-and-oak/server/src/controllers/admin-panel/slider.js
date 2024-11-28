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
        res.status(200).json({ message: 'success', data, filepath })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })

    }
}

const updateSliderStatus = async (req, res) => {
    try {
        const data = await Slider.updateOne(
            req.params,
            { $set: { status: req.body.status } }
        )
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })

    }
}

const deleteSlider = async (req, res) => {
    try {
        const data = await Slider.updateOne(
            req.params,
            {
                $set: {
                    deleted_at: Date.now()
                }
            }
        )

        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })

    }
}

const sliderById = async (req, res) => {
    try {
        const response = await Slider.findOne(req.params)
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })

    }
}

const updateSlider = async (req, res) => {
    try {
        const response = await Slider.updateOne(
            req.params,
            {
                $set: req.body
            }

        )
        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'internal server error' })

    }
}

const multiDelete = async (req, res) => {
    try {
        const data = await Slider.updateMany(
            { _id: { $in: req.body.ids } },
            {
                $set: {
                    deleted_at: Date.now()
                }
            }
        )
        res.status(200).json({ message: 'success', data })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })

    }
}

const deletedSlider = async (req, res) => {
    try {
        const response = await Slider.find({ deleted_at: { $ne: null } })
        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })

    }
}

const restoreSlider = async (req, res) => {
    try {
        const response = await Slider.updateOne(
            req.params,
            {
                $set:{
                    deleted_at: null
                }
            }
        )
        res.status(200).json({ message: 'success', data: response})

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })


    }
}

module.exports = {
    createSlider,
    readSlider,
    updateSliderStatus,
    deleteSlider,
    sliderById,
    updateSlider,
    multiDelete,
    deletedSlider,
    restoreSlider
}