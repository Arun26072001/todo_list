const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String, index: true, unique: true },
    password: { type: String },
    contact: { type: String },
    address: { type: String }
})

const User = mongoose.model("User", userSchema);

const userValidation = Joi.object({
    name: Joi.string().required().disallow(" "),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(6).required(),
    contact: Joi.string().pattern(/(6|7|8|9)\d{9}/).messages({ "string.pattern": "invalid contact number" }),
    address: Joi.string(),
    _id: Joi.any(),
    __v: Joi.any()
})

module.exports = { User, userValidation }