const validator = (req, res, next) => {
    let { name, description, preparationTime, cookingTime, imageUrl, country, veg } = req.body;

    if (!name || !description || !preparationTime || !cookingTime || !imageUrl || !country || !veg) {
        return res.status(400).json({ error: "All fields are required" });
    }
    else {
        next();
    }
}; 

module.exports = validator;