const {User} = require('../../models')
const {BadRequest} = require('http-errors')
const {sendEmail} = require("../../helpers")

const reVerifyEmail = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email})
    if(user.verify) {
        throw BadRequest('Verification has already been passed')
    }
    const mail = {
        to: email,
        subject: "Подтверждение email",
        html: `<p>Подтвердите email по ссылке https://localhost:3000/api/users/verify/${user.verificationToken}</p>`
    }
    await sendEmail(mail)
    res.json({
     message: "Verification email sent"
    })
  }

module.exports = reVerifyEmail