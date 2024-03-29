const News = require("../database/news.model");

exports.getLatestNews = async (req, res) => {
    try {
        if ((await News.find({})).length <= 1) {
            const news = await News.find({});
            res.json(news);
        } else {
            const news = await News.find({}).sort({ date: -1 });
            res.json(news);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred during getting the latest news!" });
    }
};

exports.uploadNew = async (req, res) => {
    try {
        const { title, message } = req.body;
        const news = new News({
            title,
            message
        });
        const newNewsSaved = await news.save();
        res.json(newNewsSaved);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred during upload the new 'new'!" });
    }
};

exports.patchNew = async (req, res) => {
    try {
        const newNew = await News.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { ...req.body } },
            { new: true }
        );
        if (!newNew) {
            throw new Error("Couldn't find the desired 'new' for upload!");
        }
        return res.json(newNew);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ success: false, message: "An error occurred during patching the desired 'new'!" });
    }
}

exports.deleteNew = async (req, res) => {
    try {
        const formerNew = await News.findById(req.params.id);
        if (!formerNew) {
            console.log("Couldn't find the desired 'new' for delete!");
        }
        const deleted = await formerNew.deleteOne({ _id: req.params.id });
        return res.json(deleted);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "An error occurred during delete the desired 'new'!" });
    }
}
