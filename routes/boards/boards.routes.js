const Router = require("express");
const routerRequest = new Router();
const Boards = require("../../models/Boards");
const controller = require("./boardsControl");

routerRequest.post("/boards", controller.boards);
routerRequest.post("/cards", controller.cards);
routerRequest.post("/tasks", controller.tasks);
routerRequest.get("/getboards", controller.getBoards);

// routerRequest.get("/users/:id", controller.getUser._id);

module.exports = routerRequest;
