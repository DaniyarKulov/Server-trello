const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  taskId: { type: String },
  text: { type: String },
  description: { type: String },
});

const cardSchema = new Schema({
  cardId: { type: String },
  title: { type: String },
  tasks: [taskSchema],
});

const boardSchema = new Schema({
  boardId: { type: String, required: true },
  title: { type: String, required: true },
  cards: [cardSchema],
});

const boardsStateSchema = new Schema({
  modalActive: { type: Boolean, required: true },
  boardArray: [boardSchema],
});

const Boards = model("Boards", boardsStateSchema);

module.exports = Boards;
