const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')


const authService = {
    signToken: async function (id) {
        return jwt.sign({ id }, 'my app', {
            expiresIn: 60 * 60 * 24
        })
    },
    login: async function (data) {
        try {
            const { email, password } = data;
            let userExists = await User.findOne({ email: email });
            if (!userExists) {
                return {
                    code: 400,
                    error: true,
                    msg: "User or password incorrect"
                }
            }
            let pass = await bcrypt.compare(password, userExists.password)
            if (!pass) {
                return {
                    code: 400,
                    error: true,
                    msg: "User or password incorrect"
                }
            }

            const token = await this.signToken(userExists.id);
            return {
                status: "ok",
                user: userExists,
                code: 200,
                token
            }
        } catch (error) {
            return error;
        }
    },
    register: async function (userData) {
        try {
            let pass = await bcrypt.hash(userData.password, 10)
            userData.password = pass
            const user = await userData.save();
            let token = await this.signToken(userData._id)
            return {
                user: userData,
                code: 200,
                token
            }
        } catch (error) {
            return error;
        }
    }
}

module.exports = authService;