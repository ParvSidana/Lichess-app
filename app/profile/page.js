"use client";

import { useState } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const handleFetchProfile = async () => {
    setError("");
    setProfile(null);

    if (!username) {
      setError("Please enter a username.");
      return;
    }

    try {
      const response = await axios.get(
        `https://lichess.org/api/user/${username}`
      );
      console.log(response.data);
      setProfile(response.data);
    } catch (err) {
      setError(
        "Failed to fetch profile. Please check the username and try again."
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lichess Profile Viewer</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Lichess username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "8px", marginRight: "10px", color: "black" }}
        />
        <button onClick={handleFetchProfile} style={{ padding: "8px" }}>
          Fetch Profile
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {profile && (
        <div style={{ marginTop: "20px" }}>
          <h2>User Details</h2>
          <p>{profile.username}</p>
          <p>Bio: {profile.profile.bio || "None"}</p>
          <p>Number of Games Played: {profile.count.all || "0"}</p>
          <p>
            <ul>
              <li>Rating: {profile.perfs?.blitz?.rating || "N/A"} (Blitz)</li>
              <li>Rating: {profile.perfs?.rapid?.rating || "N/A"} (Rapid)</li>
              <li>
                Rating: {profile.perfs?.classical?.rating || "N/A"} (Classical)
              </li>
            </ul>
          </p>
          {/* <p>Profile Image: {profile.avatar }</p> */}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
