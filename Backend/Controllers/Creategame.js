import Game from "../Models/game.js"

export const CreateGame = async (req, res) => {
  try {

    const gameId = Math.random().toString(36).substring(2, 8);
    const { playerId } = req.body;
    if (!playerId) {
      return res.status(400).json({ message: "playerId required" });
    }

const newGame = await Game.create({
      gameId,
      currentPlayer: "X",
      players: [playerId],
      status: "waiting",
    });

    // agar DB use kar rahe ho to yahan save karo
    // await Game.create(newGame);

    res.status(201).json({
      message: "Game created successfully",
      game: newGame 
    });

  } catch (error) {
    res.status(500).json({ message: "Error creating game", error:error.message});
  }
};