const mongoose = require('mongoose');

require("dotenv").config({ path: "../.env" });

const userModel = require('../models/user.model');


const getAll = async (req, res, next) => {
    const query = req.query.q;
    try {
        const users = await userModel.find({
            $or: [
                { "name": { $regex: new RegExp(query, 'i') } },
                { "email": { $regex: new RegExp(query, 'i') } },
                { "phone_number": { $regex: new RegExp(query, 'i') } },
            ]
        }, { password: 0 });
        res.send(users);
    }
    catch (err) {
        console.log(err.code);
        res.status(400).json({
            message: err.toString()
        })
    }
}


const getOne = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await userModel.findById(id, { password: 0 });
        res.send(user);
    }
    catch (err) {
        console.log(err.code);
        res.status(400).json({
            message: err.toString()
        })
    }
}

module.exports = {
    getAll,
    getOne
};