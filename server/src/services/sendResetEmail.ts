import * as nodemailer from "nodemailer";
export async function sendResetEmail(email: string, token: string) {
    // Create a transporter object for sending email

    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: `${process.env.USER_MAIL}`,
            pass: `${process.env.PASSWORD_MAIL}`
        },
    });
    // Define the email options
    const mailOptions = {
        from: 'noreply@example.com',
        to: email,
        subject: 'Password reset',
        html: `
            <p>Você solicitou uma redefinição de senha.</p>
            <p>Use o link a seguir para redefinir sua senha:</p>
            <a href=" ${process.env.API_URL}reset-password?token=${token}">
                ${process.env.API_URL}reset-password?token=${token}
            </a>
            <p>Se você não solicitou uma redefinição de senha, ignore este e-mail.</p>
        `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    
}