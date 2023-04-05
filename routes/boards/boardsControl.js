const Boards = require("../../models/Boards");

class boardsController {
  async boards(req, res) {
    try {
      const { boardId, title, cards } = await req.body;
      const board = new Boards({
        modalActive: false,
        boardArray: {
          boardId,
          title,
          cards,
        },
      });
      await board.save();
      console.log(req.body);
      return res.json({ message: "доска создана" });
    } catch (e) {
      res.status(400).json({ message: "Ошибка регистрации", e });
    }
  }

  async cards(req, res) {
    try {
      console.log(req.body);
    } catch (e) {
      return res.status(400).json({ message: `error ${e}` });
    }
  }

  async tasks(req, res) {
    console.log(req.body);
  }
  async getBoards(req, res) {
    try {
      const boards = await Boards.find();
      res.json(boards);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new boardsController();
