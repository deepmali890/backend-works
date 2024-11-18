const Story = require("../../models/story");

const createStory = async (req, res) => {
    try {
        const data = req.body;
        // console.log(req.body)
        // console.log(req.files)

        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.banner) data.banner = req.files.banner[0].filename;
        }

        const dataToSave = new Story(data);
        const response = await dataToSave.save()

        console.log(data)

        res.status(200).json({ message: "success", data: response });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

const readStory = async (req, res) => {
    try {
        const data = await Story.find({ deleted_at: null })
        const filepath = `${req.protocol}://${req.get('host')}/story-files/`

        res.status(200).json({ message: "success", data, filepath });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" });


    }
}

const deleteStory = async (req, res) => {
    try {
        const data = await Story.updateOne(
            req.params,
            {
                $set: {
                    deleted_at: Date.now()
                }
            }
        )
        res.status(200).json({ message: "success", data });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" });

    }
}

const updateStoryStatus = async (req, res) => {
    try {
        const data = await Story.updateOne(
            req.params,
            {
                $set: {
                    status: req.body.status
                }
            }
        )
        res.status(200).json({ message: "success", data });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const storyById = async (req, res) => {
    try {
        const response = await Story.findOne(req.params);
        res.status(200).json({ message: "success", data: response })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" });


    }
}

const updateStory = async (req, res) => {
    try {
        const response = await Story.updateOne(
            req.params,
            {
                $set: req.body
            }
        )
        res.status(200).json({ message: "success", data: response });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

const deletedStory = async (req, res) => {
    try {
        const response = await Story.find({ deleted_at: { $ne: null } })
        res.status(200).json({ message: "success", data: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

const restoreStory = async (req, res) => {
    try {
        const response = await Story.updateOne(
            req.params,
            {
                $set: {
                    deleted_at: null
                }
            }
        )
        res.status(200).json({ message: "success", data: response });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

const multiDeleteStory = async (req, res) => {
    try {
        const response = await Story.updateMany(
            { _id: { $in: req.body.ids } },
            {
                $set:{
                    deleted_at: Date.now()
                }
            }
        )
        res.status(200).json({ message: "success", data: response})
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });

    }
}

module.exports = {
    createStory,
    readStory,
    deleteStory,
    updateStoryStatus,
    storyById,
    updateStory,
    deletedStory,
    restoreStory,
    multiDeleteStory
}