import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {

  const [gameId, setGameId] = useState("");
  const [store, setStore] = useState(Array(9).fill(null));

  // modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // inputs
  const [playerId, setPlayerId] = useState("");
  const [joinPlayerId, setJoinPlayerId] = useState("");
  const [joinGameId, setJoinGameId] = useState("");

  // 🎮 MOVE
  const handleMove = async (index) => {

    if (store[index] !== null) return;

    try {
      const response = await fetch("http://localhost:3000/api/move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gameId,
          position: index
        })
      });

      const data = await response.json();

      if (data?.game?.board) {
        setStore(data.game.board);
      }

      if (data?.game?.winner) {
          toast.success(`🏆 Winner: ${data.game.winner}`);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // 🎮 CREATE GAME
  const handleCreate = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/creategame", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          playerId: playerId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setGameId(data.game.gameId);
        setShowCreateModal(false);
        toast.success("Game Created 🎉");
      }

    } catch (error) {
      console.log(error);
    }
  };

  // 🎮 JOIN GAME
  const handleJoin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/join-game", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gameId: joinGameId,
          playerId: joinPlayerId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setGameId(joinGameId);
        setShowJoinModal(false);
         toast.success("Joined Game 🚀")
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">

      <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 w-[420px] text-center text-white">

        <h1 className="text-4xl font-extrabold mb-4">Tic Tac Toe 🎮</h1>

        {/* Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 py-2 rounded-xl"
          >
            Create
          </button>

          <button
            onClick={() => setShowJoinModal(true)}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 py-2 rounded-xl"
          >
            Join
          </button>
        </div>

        {/* Game ID */}
        <p className="mb-4 text-sm">
          Game ID: <span className="text-yellow-300">{gameId || "No Game"}</span>
        </p>

        {/* Board */}
        <div className="grid grid-cols-3 gap-4">
          {store.map((cell, i) => (
            <button
              key={i}
              disabled={cell !== null}
              onClick={() => handleMove(i)}
              className={`w-24 h-24 flex items-center justify-center text-4xl font-bold rounded-2xl bg-white/20 hover:bg-white/30 transition

              ${cell === "X" ? "text-red-400" : ""}
              ${cell === "O" ? "text-blue-400" : ""}
              `}
            >
              {cell}
            </button>
          ))}
        </div>

      </div>

      {/* 🔵 CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white text-black p-6 rounded-xl w-[300px]">

            <h2 className="mb-4 font-bold text-lg">Create Game</h2>

            <input
              placeholder="Player ID"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />

            <div className="flex gap-2">
              <button onClick={handleCreate} className="flex-1 bg-blue-500 text-white py-2 rounded">
                Create
              </button>

              <button onClick={() => setShowCreateModal(false)} className="flex-1 bg-gray-400 text-white py-2 rounded">
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🟢 JOIN MODAL */}
      {showJoinModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white text-black p-6 rounded-xl w-[300px]">

            <h2 className="mb-4 font-bold text-lg">Join Game</h2>

            <input
              placeholder="Game ID"
              value={joinGameId}
              onChange={(e) => setJoinGameId(e.target.value)}
              className="w-full mb-2 p-2 border rounded"
            />

            <input
              placeholder="Player ID"
              value={joinPlayerId}
              onChange={(e) => setJoinPlayerId(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />

            <div className="flex gap-2">
              <button onClick={handleJoin} className="flex-1 bg-green-500 text-white py-2 rounded">
                Join
              </button>

              <button onClick={() => setShowJoinModal(false)} className="flex-1 bg-gray-400 text-white py-2 rounded">
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;