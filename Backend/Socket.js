const socketIO = require("socket.io");
require("dotenv").config();
let io;

function initSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173", // Use your real frontend domain in production
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinShopRoom", (shopId) => {
    console.log(`Owner joined shop room: ${shopId}`);
    socket.join(shopId); // Shop owner joins their room
  });

  socket.on("joinAdminRoom", () => {
    console.log("Admin joined admin room");
    socket.join("adminRoom"); // Admin joins a global admin room
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
