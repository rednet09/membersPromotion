import React, { useState } from "react";
import axios from "axios";
import UserList from "./components/UserList";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setError("Name and email are required.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/users/register", {
        name,
        email,
      });
      setName("");
      setEmail("");
      setError("");
      setRefresh(!refresh); // Trigger refresh
    } catch (error) {
      setError(error.response?.data || "Server error");
    }
  };

  return (
    <div>
      <h1>User Registration</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <UserList refresh={refresh} />
    </div>
  );
};

export default App;
