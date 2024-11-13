"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const LeaderboardPage = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          `https://lichess.org/api/player/top/100/bullet`
        );
        setPlayers(response.data);
      } catch (err) {
        setError("Failed to fetch leaderboard. Please try again later.");
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Top Bullet Players</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && players.length > 0 && (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rank</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Username
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Title
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.username}>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {player.username}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {player.title || "None"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {player.perf.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaderboardPage;
