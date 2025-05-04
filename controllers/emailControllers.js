const transporter = require("../config/mailConfig");

exports.sendEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Send email to user
    await transporter.sendMail({
        from: `"Arhum" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Subscription Confirmed ✅",
        text: "Thank you for subscribing!",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Thank You for Subscribing!</h2>
            <p>We're excited to have you onboard. Stay tuned for updates!</p>
          </div>
        `,
      });
      

    // Send email to yourself
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: "New Subscriber",
      text: `User ${email} has subscribed.`,
    });

    res.json({ message: "Subscription successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Email sending failed" });
  }
};
