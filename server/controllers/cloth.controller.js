exports.getClothes = async (req, res, dataModel, logText) => {
    try {
        const clothes = await dataModel.find({});
        res.json(clothes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `An error occurred during getting the ${logText}!` });
    }
};

exports.uploadCloth = async (req, res, dataModel, logText) => {
    try {
        const { name, brand, price, audience, image } = req.body;
        const newCloth = new dataModel({
            name,
            brand,
            price,
            audience,
            image
        });
        const savedCloth = await newCloth.save();
        res.json(savedCloth);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `An error occurred during upload the new ${logText}!` });
    }
};

exports.patchCloth  = async (req, res, dataModel, logText) => {
    try {
        const cloth = await dataModel.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { ...req.body } },
            { new: true }
        );
        if (!cloth) {
            throw new Error(`Couldn't find the desired ${logText} for upload!`);
        }
        return res.json(cloth);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ success: false, message: `An error occurred during patching the desired ${logText}!`});
    }
}

exports.deleteCloth = async (req, res, dataModel, logText) => {
    try {
        const cloth = await dataModel.findById(req.params.id);
        if (!cloth) {
            throw new Error(`Couldn't find the desired ${logText} for delete!`);
        }
        const deleted = await dataModel.deleteOne();
        return res.json(deleted);
    } catch (error) {
        console.error(error.stack);
        res.status(500).json({ success: false, message: `An error occurred during delete the desired ${logText}!` });
    }
}
