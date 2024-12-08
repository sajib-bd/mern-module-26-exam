import Contact from "../models/contactModel.js";
import { Mail } from "../utils/mail.js";
import { ContactFormMail } from "../utils/mailTemplate.js";

export const ContactCreate = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    await Mail(
      process.env.CONTACT_MAIL,
      subject,
      ContactFormMail(name, email, subject, message)
    );

    await Contact.create({ name, email, subject, message });
    return res.status(200).json({
      message: "Mail Sent successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};

export const ContactRead = async (req, res) => {
  try {
    const contact = await Contact.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
};
