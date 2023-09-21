const sendEmail = (senderEmail, senderName) => {
  const brevo = require("@getbrevo/brevo");
  let defaultClient = brevo.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey =
    "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";

  let apiInstance = new brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "Email Verification";
  sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
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
                    <h2 style="color: #333;">Email Verification</h2>
                    <p>${senderName}</p>
                    <p>Thank you for registering with our service. To verify your email address and complete the registration process, please click the following button:</p>
                    <p><a href="{{params.verificationLink}}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none;">Verify Email</a></p>
                    <p>If the button above doesn't work, you can also copy and paste the following URL into your web browser:</p>
                    <p>{{params.verificationLink}}</p>
                    <p>If you did not sign up for our service, you can safely ignore this email.</p>
                    <p>Best regards,</p>
                    <p>Your {{params.organization}}</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
`;

  sendSmtpEmail.sender = {
    name: "Aspire",
    email: "Aspire@gmail.com",
  };

  sendSmtpEmail.to = [{ email: senderEmail, name: senderName }];
  sendSmtpEmail.replyTo = { email: "Aspire@gmail.com", name: "reuben" };
  sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  sendSmtpEmail.params = {
    name: "Recipient Name",
    verificationLink: "my verification link",
    organization: "Your Organization Name",
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );
};

module.exports = sendEmail;
