const socketIO = require("socket.io");
require("dotenv").config();
let io;

function initSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: process.env.FRONTENDLINK, // Use your real frontend domain in production
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("joinShopRoom", (shopId) => {
      console.log(`Owner joined shop room: ${shopId}`);
      socket.join(shopId); // Owner joins their own shop room
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}

module.exports = { initSocket, getIO };
