const forgotPasswordTemplate = ({ name, otp }) => {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; width: 100%; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; background: #fff; max-width: 100vw; overflow-x: hidden;">
        
        <!-- Logo -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://res.cloudinary.com/dwuawivlq/image/upload/v1742811453/logo_qc26rj.png" 
                 alt="Binkeyit Logo" 
                 style="max-width: 180px; width: 100%; display: block; margin: auto;">
        </div>

        <!-- Header -->
        <h2 style="color: #ffcc00; text-align: center; font-size: 22px;">🔐 Password Reset Request</h2>
        
        <!-- Greeting -->
        <p style="text-align: center; font-size: 16px; margin-bottom: 10px;">Dear <strong>${name}</strong>,</p>
        
        <!-- Instruction -->
        <p style="text-align: center; font-size: 15px; margin: 0 10px;">We received a request to reset your <strong style="color: #ffcc00;">Binkey</strong><strong style="color: #00aa00;">it</strong> account password. If you made this request, use the OTP code below to proceed.</p>
        
        <!-- OTP Code -->
        <div style="background: #ffcc00; color: #000; font-size: 26px; padding: 15px; text-align: center; font-weight: bold; border-radius: 5px; letter-spacing: 2px; margin: 20px auto; max-width: 80%; width: 300px;">
            ${otp}
        </div>
        
        <!-- Warning -->
        <p style="text-align: center; font-size: 14px; margin: 0 10px;"><strong>⚠️ This OTP is valid for only 1 hour.</strong> Enter it on the <strong style="color: #ffcc00;">Binkey</strong><strong style="color: #00aa00;">it</strong> website to reset your password.</p>
        
        <!-- Support Info -->
        <p style="text-align: center; font-size: 14px; margin: 0 10px;">If you didn’t request this, please ignore this email or contact our support team at <a href="mailto:support@binkeyit.com" style="color: #ff6f00; text-decoration: none;">support@binkeyit.com</a>.</p>

        <!-- Reset Password Button -->
        <p style="margin-top: 30px; text-align: center;">
            <a href="https://binkeyit.com/reset-password" 
               style="background: #00aa00; color: #fff; padding: 14px 30px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 6px; display: inline-block;">
                🔑 Reset Password
            </a>
        </p>

        <!-- Footer -->
        <hr style="margin: 30px 0; border: 0.5px solid #ddd;">
        <p style="text-align: center; color: #777; font-size: 13px;">
            If you need help, reach out to our support team.
            <br>© ${new Date().getFullYear()} <strong style="color: #ffcc00;">Binkey</strong><strong style="color: #00aa00;">it</strong>. All rights reserved.
        </p>
    </div>
    `;
};

export default forgotPasswordTemplate;
