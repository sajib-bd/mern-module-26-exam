export const ContactFormMail = (name, email, subject, message) => {
  return `<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.8;">
      <div style="background-color: #ffffff; padding: 25px; border-radius: 8px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #007BFF; font-size: 22px; text-align: center; margin-bottom: 20px; border-bottom: 2px solid #007BFF; padding-bottom: 10px;">Contact Form Submission</h2>
        <p style="font-size: 16px; margin-bottom: 10px;">Hello,</p>
        <p style="font-size: 16px; margin-bottom: 20px;">You have received a new message from your website's contact form:</p>
        
        <table style="width: 100%; background-color: #f9f9f9; border-collapse: collapse; border-radius: 6px; overflow: hidden; margin-bottom: 20px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <tr style="background-color: #007BFF; color: #fff;">
            <th style="padding: 12px; text-align: left;">Field</th>
            <th style="padding: 12px; text-align: left;">Details</th>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Subject:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #ddd;">${subject}</td>
          </tr>
        </table>

        <p style="font-size: 16px; margin-bottom: 10px;"><strong>Message:</strong></p>
        <p style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; font-size: 16px; color: #555;">${message}</p>
        
        <p style="font-size: 14px; color: #777; margin-top: 20px;">This email is auto-generated. Please do not reply to this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="font-size: 12px; color: #aaa; text-align: center;">Thank you for using our services!</p>
      </div>
    </div>`;
};
