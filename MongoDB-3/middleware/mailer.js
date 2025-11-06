const nodemailer=require("nodemailer")

const transport=nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : "sahilzinzuvadiya77@gmail.com",
        pass : "bhzyptopdhygskdu"
    }
})

module.exports.sendOtp = (to,otp)=>{
    let mailoptions={
        from : "sahilzinzuvadiya77@gmail.com",
        to: to,
        subject : "Forgot password OTP",
        text : `Your OTP is ${otp}`
    };

    transport.sendMail(mailoptions)
}