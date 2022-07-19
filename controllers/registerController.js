const User = require('../models/User');
const bcrypt = require('bcrypt');

const getRegisterPage = (req, res) => {
    res.render("register", {
        page_name : 'register'
    });
}

const createNewUser = async (req, res) => {
    const {username, firstname, lastname, address, password} = req.body;
    console.log(req.body);
    if(!username || !firstname || !lastname || !address || !password) return res.status(400).json({'error' : 'Every fields must be filled'});

    // Check if username is duplicated
    const duplicate = await User.findOne({username: username}).exec();
    console.log(duplicate);
    if(duplicate != null) return res.status(409).json({'error' : '409 Conflict' ,'msg' : `User ${username} has already been created`});

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const result = await User.create({
            "username": username,
            "firstname": firstname,
            "lastname": lastname,
            "address": address,
            "password": hashedPwd
        });

        console.log(result);
        // res.status(201).json({'msg' : `New user ${username} has been created`});
        res.render("login", {
            page_name : "login",
            fromRegister : true,
            msg : `New user ${username} has been created`
        })
    }
    catch (err) {
        res.status(500).json({'msg' : err.message});
    }
};

module.exports = { createNewUser, getRegisterPage };