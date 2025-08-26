const express = require("express");
const { userValidation, User } = require("../models/userModel");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { error } = userValidation.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.message.split(".");
            return res.status(400).send({ status: false, errors })
        }
        const [isExistsEmail, isExistsConatct] = await Promise.all([User.findOne({ email: req.body.email }), User.findOne({ contact: req.body.contact })]);
        if (isExistsEmail) {
            return res.status(400).send({ status: false, errors: [`email is already exists`] })
        }
        if (isExistsConatct){
            return res.status(400).send({ status: false, errors: [`contact is already exists`] })
        }
        const user = await User.create(req.body);
        return res.send({ status: true, message: `${user.name} has been added successfully` })
    } catch (error) {
        console.log("error in add user", error)
        return res.status(500).send({ status: false, message: error.message })
    }
})

router.get("/", async (req, res) => {
    try {
        const users = await User.find({}).lean().exec();
        return res.send({ status: true, users })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const isExists = await User.exists({ _id: userId })
        if (!isExists) {
            return res.status(404).send({ status: false, message: "User not found, please re-fresh the page and try again" })
        }
        const { error } = userValidation.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.message.split(".");
            return res.status(400).send({ status: false, errors })
        }
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        return res.send({ status: true, message: `${updatedUser.name} has been updated successfully` })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const isExists = await User.exists({ _id: userId })
        if (!isExists) {
            return res.status(404).send({ status: false, message: "User not found, please re-fresh the page and try again" })
        }
        const updatedUser = await User.findByIdAndDelete(userId);
        return res.send({ status: true, message: `${updatedUser.name} has been Deleted successfully` })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
})

module.exports = router;