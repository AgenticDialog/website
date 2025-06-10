const transporter = require("../config/mailConfig");

exports.sendMail = async (req, res) => {
  try {
    const { name, email, role, companyName, companyWebsite, companySize, revenue, budget, services, help } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const mailOptions = {
      from: process.env.SMTP_USER, // Jis email se data bhejna hai
      to: process.env.SMTP_USER, // Jis email pr data bhejna hai
      subject: "New Form Submission",
      html: `
        <h3>New Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Company Website:</strong> ${companyWebsite}</p>
        <p><strong>Company Size:</strong> ${companySize}</p>
        <p><strong>Annual Revenue:</strong> ${revenue}</p>
        <p><strong>Budget:</strong> ${budget}</p>
        <p><strong>Interested Services:</strong> ${services}</p>
        <p><strong>Additional Help:</strong> ${help}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
