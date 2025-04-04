import {Server } from "socket.io"
import http from "http"
import express from "express"

const app = express()
const server = http.createServer(app)

export function getReceiverSocketId(userId){
    return userSocketMap[userId]
}

const io = new Server(server,{
    cors:{
        origin:["https://chat-io-9xh6.onrender.com"]
    }
})

const userSocketMap = {};

io.on("connection",(socket)=>{
    console.log("A user has connected",socket.id);

    const userId = socket.handshake.query.userId
    if(userId) userSocketMap[userId]=socket.id

    io.emit("getOnlineUser",Object.keys(userSocketMap))
    
    socket.on("disconnect",()=>{
        console.log("A user has disconnected",socket.id)
        delete userSocketMap[userId]
        io.emit("getOnlineUser",Object.keys(userSocketMap))
    })
})

export {io,app,server}