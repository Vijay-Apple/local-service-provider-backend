import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, message }) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"ServiceHub" <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject,
        text: message,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email Sent:", info.messageId);
};

export default sendEmail;