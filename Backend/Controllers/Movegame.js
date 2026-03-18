import Game from "../Models/game.js";
import  {checkWinner}  from "../Utils/checkWinner.js";
import  {getAIMove}  from "../Utils/getAIMove.js";

// export const makeMove = async (req, res) => {

//   try {

//     const { gameId, index } = req.body;

//     const game = await Game.findOne({ gameId });

//     if (!game) {
//       return res.json({ message: "Game not found" });
//     }

//     if (game.board[index]) {
//       return res.json({ message: "Cell already filled" });
//     }

//     game.board[index] = game.currentPlayer;

//     const winner = checkWinner(game.board);

//     if (winner) {

//       game.winner = winner;
//       game.status = "finished";

//     } else {

//       game.currentPlayer =
//         game.currentPlayer === "X" ? "O" : "X";

//     }

//     await game.save();

//     res.json({
//       message: "Move played",
//       game
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Move error" });
//   }
// };




export const makeMove = async (req,res)=>{

try{

console.log("BODY:", req.body);
const {gameId , position ,players} = req.body || {};
console.log(gameId);
console.log(position); 
console.log(players);




const game = await Game.findOne({gameId})
console.log(game);

if(!game){
return res.status(404).json({message:"Game not found"})
}

if(game.board[position] !== null){
return res.json({message:"Cell already filled"})
}

game.board[position] = "X";

let  winner = checkWinner(game.board)

if(winner){
game.winner = winner
game.status = "finished"
await game.save();
return res.json({ game });
} 




  const aiMove = getAIMove(game.board);

    if (aiMove !== null) {
      game.board[aiMove] = "O";
    }

    winner = checkWinner(game.board);

    if (winner) {
      game.winner = winner;
      game.status = "finished";
    }

    await game.save();

    res.json({
      message: "Move + AI done",
      game
    });


}catch(err){
res.status(500).json({message:"Server error",error:err.message})
}

}