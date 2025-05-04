const express = require("express");
const router = express.Router();
const { sendMail } = require("../controllers/formController");

router.post("/contact", sendMail);

module.exports = router;
