const cron = require('node-cron');
const moment = require('moment-timezone');
const Owner = require('../Models/Owner');
const Fish = require('../Models/Fish');
const Cart = require('../Models/Cart');

function cronSchedule() {

  cron.schedule('* * * * *', async () => {
    const now = moment().tz("Asia/Kolkata").format("HH:mm");

    const shops = await Owner.find({});
    for (const shop of shops) {
      if (shop.shopCloseTime === now) {
        await Fish.deleteMany({ owner: shop._id });
        await Cart.updateMany(
          {},
          { $pull: { items: { shopId: shop._id } } }
        );
        console.log(`Deleted fish & cart items for shop ${shop.shopName}`);
      }
    }
  });
}

module.exports = cronSchedule;
