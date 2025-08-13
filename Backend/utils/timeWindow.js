// utils/timeWindow.js
const moment = require("moment-timezone");

function isInEditWindow() {
  const now = moment().tz("Asia/Kolkata");
  const morningStart = moment().tz("Asia/Kolkata").set({ hour: 8, minute: 0, second: 0 });
  const morningEnd = morningStart.clone().add(15, 'minutes');

  const afternoonStart = moment().tz("Asia/Kolkata").set({ hour: 13, minute: 0, second: 0 });
  const afternoonEnd = afternoonStart.clone().add(15, 'minutes');

  return (now.isBetween(morningStart, morningEnd)) || (now.isBetween(afternoonStart, afternoonEnd));
}

module.exports = { isInEditWindow };
