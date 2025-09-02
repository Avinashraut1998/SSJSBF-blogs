import transporter from "../config/mailer.js";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const sendOtpEmail = async (from, to, subject, otp) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const emailHtml= await ejs.renderFile(path.join(__dirname,"../views/otpEmail.template.ejs"), { otp })
    const info = await transporter.sendMail({
      from: from,
      to,
      subject,
      html: emailHtml
    },
    )
    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export { sendOtpEmail };