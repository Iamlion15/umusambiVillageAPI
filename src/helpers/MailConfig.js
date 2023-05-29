import nodemailer from 'nodemailer';

const sendMail = async (receiver, OTP) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodereactproject2023@gmail.com',
            pass: 'kednhlntspkrqrvp'
        }
    })
    const mailOptions = {
        from: 'nodereactproject2023@gmail.com',
        to: receiver,
        subject: 'ONE TIME PASSWORD',
        text: `your one time password is ${OTP}`
    };
    try {
        // send mail
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}
export default sendMail;