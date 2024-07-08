import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = ({ refresh }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registered Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} (Pool: {user.pool}, Wallet: {user.wallet})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
