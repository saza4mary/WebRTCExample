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

function handleConnection (socket) {
    console.log(socket);
}

wss.on("connection", handleConnection);

server.listen(3000, handleListen);