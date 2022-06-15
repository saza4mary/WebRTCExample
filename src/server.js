//BACK END
//Express는 HTTP를 다룬다
//WebSocket Protocol ws 추가
import http from "http"
import WebSocket from 'ws';
import express from "express";
import { on } from "events";

const app = express();

console.log("hello");

app.set("view engine", "pug");
app.set("views", __dirname + "/views")
app.use("/public", express.static(__dirname + "/public"));

//request - response 방식
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);


//Create Server
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

function onSocketClose()
{
    console.log("Disconnected form the Browser ❌");
}

function OnSocketMessage(message)
{
    const translatedMessageData = message.toString('utf8');
    console.log(translatedMessageData);
}


wss.on("connection", (socket) => 
{
    console.log("Connected to Browser 👍");
    socket.on("close", onSocketClose);
    socket.on("message", OnSocketMessage);
    socket.send("Hello!!!");
});

server.listen(3000, handleListen);