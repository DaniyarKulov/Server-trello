const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth.routes");
const boardRouter = require("./routes/boards/boards.routes");
const cors = require("./middlewaree/cors.middle");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/bord", boardRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Neo:Neo12345@trell.quqbv7d.mongodb.net/?retryWrites=true&w=majority"
    );

    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
