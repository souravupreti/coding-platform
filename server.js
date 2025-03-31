const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      transports: ["websocket", "polling"],
    }
  });

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("message",(message)=>{
      console.log(message);
    });
    socket.on("add",(payload)=>{
      console.log(payload);
      io.emit(" ",payload); 
    });
    socket.on("minus",(payload)=>{
      console.log(payload);
      io.emit("minus",payload);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});