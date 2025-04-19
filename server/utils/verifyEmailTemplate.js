const verifyEmailTemplate = ({ name, url }) => {
    return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: center; padding: 20px; max-width: 600px; width: 100%; margin: auto; border: 1px solid #ddd; border-radius: 8px; background: #fff;">
        
        <!-- Logo -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://res.cloudinary.com/dwuawivlq/image/upload/v1742811453/logo_qc26rj.png" 
                 alt="Binkeyit Logo" 
                 style="max-width: 180px; width: 100%; display: block; margin: auto;">
        </div>

        <!-- Header -->
        <h2 style="color: #ffcc00; font-size: 24px; font-weight: bold;">🚀 Welcome to <span style="color: #ffcc00;">Binkey</span><span style="color: #00aa00;">it</span>, ${name}!</h2>
        
        <!-- Message -->
        <p style="font-size: 16px; margin-bottom: 10px;">You're just one step away from unlocking <strong>super-fast deliveries in 10 minutes! 🚀</strong></p>
        <p style="font-size: 15px; margin-bottom: 20px;">To activate your <span style="color: #ffcc00;">Binkey</span><span style="color: #00aa00;">it</span> account, please verify your email below:</p>
        
        <!-- Verify Button -->
        <div style="margin: 20px 0;">
            <a href="${url}" 
               style="background: #00aa00; color: white; padding: 14px 32px; font-size: 17px; font-weight: bold; text-decoration: none; border-radius: 6px; display: inline-block; box-shadow: 2px 2px 10px rgba(0,0,0,0.1); transition: 0.3s;">
               ✅ Verify Email
            </a>
        </div>

        <!-- Secondary Message -->
        <p style="font-size: 14px; color: #666;">If the button above doesn't work, you can also verify by clicking the link below:</p>
        <p><a href="${url}" style="color: #00aa00; word-wrap: break-word;">${url}</a></p>

        <!-- Warning -->
        <p style="margin-top: 30px; font-size: 14px; color: #555;"><strong>⚠️ If you didn’t sign up for <span style="color: #ffcc00;">Binkey</span><span style="color: #00aa00;">it</span>, please ignore this email.</strong></p>

        <!-- Footer -->
        <hr style="margin: 30px 0; border: 0.5px solid #ddd;">
        <p style="font-size: 12px; color: #777;">
            Need help? Contact our support team at 
            <a href="mailto:support@binkeyit.com" style="color: #ff6f00; text-decoration: none;">support@binkeyit.com</a>.
        </p>
        <p style="font-size: 12px; color: #777;">© ${new Date().getFullYear()} <span style="color: #ffcc00;">Binkey</span><span style="color: #00aa00;">it</span> – Your essentials, delivered in 10 minutes! 🚀</p>
    </div>
    `;
};

export default verifyEmailTemplate;
