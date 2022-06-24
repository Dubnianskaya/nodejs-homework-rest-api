const {Conflict} = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const {v4} = require("uuid");

const {User} = require('../../models')
const {sendEmail} = require("../../helpers")

const signUp = async (req, res) => {
    const {email, password, subscription} = req.body;
    const user = await User.findOne({email})
    if(user) {
        throw new Conflict("Email in use")
    }

    const verificationToken = v4()
    const avatarURL = gravatar.url(email)
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    await User.create({email, password: hashPassword, subscription, avatarURL, verificationToken});
    const mail = {
        to: email,
        subject: "Подтверждение email",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Подтвердите email</a>`
    }
    await sendEmail(mail)

    res.status(201).json({
    status: "success",
    code: 201,
    data: {
        user: {
            email,
            subscription,
            avatarURL,
            verificationToken
        }
    }
    })
  }

module.exports = signUp