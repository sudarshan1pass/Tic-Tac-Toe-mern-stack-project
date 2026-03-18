import Game from "../Models/game.js"


export const joinGame = async (req, res) => {
    
  try {
    const { gameId, playerId } = req.body;

    console.log("Incoming gameId:", gameId);

    const game = await Game.findOne({gameId:gameId});
    console.log("Game found:", game); 

    if (!game) return res.status(404).json({ message: "Game not found" });

    if (game.players.length >= 2)
      return res.json({ message: "Game full" }); 

    game.players.push(playerId);

    if (game.players.length === 2) {
      game.status = "playing";
    }
   await game.save();

    res.json({ message: "Joined game", game });

  } catch (err) {
  console.log("JOIN ERROR:", err);
  res.status(500).json({ message: "Error joining game"+err });
}
  }
