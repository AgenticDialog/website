const express = require("express");
const { sendEmail } = require("../controllers/emailControllers");

const router = express.Router();

router.post("/subscribe", sendEmail);

module.exports = router;
