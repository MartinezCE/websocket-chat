//https://socket.io/docs/v4/server-initialization/
const express = require("express");
const app = express();

//IMPLEMENTACION
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

httpServer.listen(3000, () => console.log("SERVER ON"));

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

let msgs = [];

io.on("connection", (socket) => {
  console.log("user conectado " + socket.id);

  socket.on("msg", (data) => {
    msgs.push(data);
    console.log("llego un msg: " + data);

    socket.emit("msg", "gracias!!");
    io.sockets.emit("array-msg", msgs);
  });
});
