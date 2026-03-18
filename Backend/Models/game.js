const mongoose = require("mongoose");

const game = new mongoose.Schema({
  gameId: {
    type: String,
    required: true,
    unique: true,
  },

  players: {
    type: [String], // player ids
    default: [],
  },

  board: {
    type: [String], // 9 cells (X / O)
    default: Array(9).fill(null),
  },

  currentPlayer: {
    type: String,
    default: "X",
  },

   winner: {
    type: String,
    default: null
  },

  status: {
    type: String,
    enum: ["waiting", "playing", "finished"],
    default: "waiting",
  },
});



 


module.exports = mongoose.model("Game", game);

