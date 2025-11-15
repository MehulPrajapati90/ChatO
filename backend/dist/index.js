import express from "express";
import cors from "cors";
import { createServer } from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
dotenv.config();
const app = express();
const port = process.env.PORT;
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
app.use(cors({
    origin: "http://localhost:5000/",
}));
app.use(express.json());
const ROOM = "group";
io.on('connection', (socket) => {
    // console.log('A user connected', socket.id);
    // Join Room
    socket.on('join-room', async (username) => {
        console.log(`${username} is joining the ${ROOM}`);
        await socket.join(ROOM);
        // Send to all including the joined user!
        // io.to(ROOM).emit("room-notice", username);
        // broadcast to all excluding the joined user!
        socket.to(ROOM).emit("room-notice", username);
    });
    // chat messages!
    socket.on('chat-message', (msg) => {
        socket.to(ROOM).emit("chat-message", msg);
    });
    // typing
    socket.on('typing', (username) => {
        socket.to(ROOM).emit("typing", username);
    });
    // stop typing
    socket.on('stop-typing', (username) => {
        socket.to(ROOM).emit("stop-typing", username);
    });
});
app.get('/', (req, res) => {
    res.json({
        message: "Hello world"
    });
});
server.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map