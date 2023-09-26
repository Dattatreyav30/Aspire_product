require("dotenv").config();
const brevo = require("@getbrevo/brevo");

const sendEmail = (senderEmail, senderName, link, emailHeading, btnName) => {
  const apiKey = process.env.BREVO_API_KEY;
  const apiInstance = new brevo.TransactionalEmailsApi();

  const emailContent = `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${emailHeading}</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="600" style="margin: auto; background-color: #ffffff; padding: 20px;">
            <tr>
                <td style="text-align: center;">
                    <img src="https://assets.website-files.com/60cb29161379a13eb35ec230/6337f8bcbe228e91b2cd1fb8_logo.svg" alt="Logo" style="max-width: 150px;">
                </td>
            </tr>
            <tr>
                <td style="text-align: center; padding: 20px;">
                    <h2 style="color: #333;">${emailHeading}</h2>
                    <p>${senderName}</p>
                    <p>Thank you for registering with our service. To verify your email address and complete the registration process, please click the following button:</p>
                    <p><a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">${btnName}</a></p>
                    <p>If the button above doesn't work, you can also copy and paste the following URL into your web browser:</p>
                    <p>${link}</p>
                    <p>If you did not sign up for our service, you can safely ignore this email.</p>
                    <p>Best regards,</p>
                    <p>Aspire</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;

  const sendSmtpEmail = {
    subject: "Email Verification",
    htmlContent: emailContent,
    sender: {
      name: "Aspire",
      email: "Aspire@gmail.com",
    },
    to: [{ email: senderEmail, name: senderName }],
    replyTo: { email: "Aspire@gmail.com", name: "reuben" },
    headers: { "Some-Custom-Name": "unique-id-1234" },
    params: {
      name: senderName,
      verificationLink: link,
      organization: "Aspire",
    },
  };

  brevo.ApiClient.instance.authentications["api-key"].apiKey = apiKey;

  apiInstance.sendTransacEmail(sendSmtpEmail)
    .then(function (data) {
      console.log("Email sent successfully:", data);
    })
    .catch(function (error) {
      console.error("Error sending email:", error);
    });
};

module.exports = sendEmail;
