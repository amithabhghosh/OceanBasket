const express = require('express');
const router = express.Router();
const {generateNewToken} = require("../utils/generateNewToken")

router.post("/refresh",generateNewToken)

module.exports = router