const express = require("express");
const router = express.Router();
const { CreateGame} = require("../Controllers/Creategame.js");
const { joinGame } = require("../Controllers/joingame.js");
const { makeMove } = require("../Controllers/Movegame.js");




router.post("/creategame", CreateGame);
router.post("/join-game", joinGame);
router.post("/move", makeMove);

module.exports = router;