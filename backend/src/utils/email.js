import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD
            }
        });
    }

    async sendVerificationEmail(to, token) {
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;
        
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: to,
            subject: 'Xác thực tài khoản Nifty',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Xác thực tài khoản Nifty</h2>
                    <p>Chào bạn,</p>
                    <p>Cảm ơn bạn đã đăng ký tài khoản tại Nifty. Để hoàn tất quá trình đăng ký, vui lòng click vào nút bên dưới để xác thực email của bạn:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationLink}" 
                           style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px;">
                            Xác thực email
                        </a>
                    </div>
                    <p>Hoặc copy đường link sau vào trình duyệt:</p>
                    <p>${verificationLink}</p>
                    <p>Link xác thực này sẽ hết hạn sau 24 giờ.</p>
                    <p>Nếu bạn không đăng ký tài khoản tại Nifty, vui lòng bỏ qua email này.</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">Email này được gửi tự động, vui lòng không trả lời.</p>
                </div>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email xác thực đã được gửi đến:', to);
            return true;
        } catch (error) {
            console.error('Lỗi gửi email:', error);
            throw new Error('Không thể gửi email xác thực');
        }
    }

    async sendPasswordResetEmail(to, userId) {
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${userId}`;
        
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: to,
            subject: 'Đặt lại mật khẩu Nifty',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Đặt lại mật khẩu Nifty</h2>
                    <p>Chào bạn,</p>
                    <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Click vào nút bên dưới để đặt lại mật khẩu:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" 
                           style="background-color: #4CAF50; color: white; padding: 14px 20px; text-decoration: none; border-radius: 4px;">
                            Đặt lại mật khẩu
                        </a>
                    </div>
                    <p>Hoặc copy đường link sau vào trình duyệt:</p>
                    <p>${resetLink}</p>
                    <p>Link này sẽ hết hạn sau 1 giờ.</p>
                    <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
                    <hr style="border: 1px solid #eee; margin: 20px 0;">
                    <p style="color: #666; font-size: 12px;">Email này được gửi tự động, vui lòng không trả lời.</p>
                </div>
            `
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email đặt lại mật khẩu đã được gửi đến:', to);
            return true;
        } catch (error) {
            console.error('Lỗi gửi email:', error);
            throw new Error('Không thể gửi email đặt lại mật khẩu');
        }
    }
}

// Tạo instance của EmailService
export const emailService = new EmailService();

// Hàm tương thích với code hiện tại
// export const sendEmail = async ({ to, subject, text }) => {
//     const mailOptions = {
//         from: process.env.GMAIL_USER,
//         to: to,
//         subject: subject,
//         text: text
//     };

//     try {
//         await emailService.transporter.sendMail(mailOptions);
//         console.log('Email đã được gửi đến:', to);
//         return true;
//     } catch (error) {
//         console.error('Lỗi gửi email:', error);
//         throw new Error('Không thể gửi email');
//     }
// };