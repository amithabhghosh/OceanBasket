const axios = require('axios');
require('dotenv').config();

const sendOTP = async (phone, otp) => {
  try {
    const response = await axios.get('https://www.fast2sms.com/dev/bulkV2', {
      // params: {
      //   route: 'q', // test route
      //   message: `Your OTP is ${otp}`,
      //   language: 'english',
      //   numbers: phone
      // },
      // headers: {
      //   Authorization: process.env.FAST2SMS_API_KEY
      // }

      // params: {
      //   authorization: process.env.FAST2SMS_API_KEY,
      //   variables_values: `Your OTP is ${otp}`,
      //   route: 'otp',
      //   numbers: phone
      // }
  
    });

    return response.data;
  } catch (err) {
    console.error('SMS sending failed:', err.response?.data || err.message);
    throw err;
  }
};

module.exports = sendOTP;
