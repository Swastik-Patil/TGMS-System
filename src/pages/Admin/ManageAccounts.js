// AdminPage.js
import React, { useState, useEffect, useContext } from "react";

import { useFirebase } from "../../contexts/FirebaseContext";
export default function ManageAccounts() {
  const firebase = useFirebase();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await firebase
        .database()
        .ref("users")
        .once("value");
      const usersData = usersSnapshot.val();
      const usersArray = usersData ? Object.entries(usersData) : [];
      setUsers(usersArray);
    };
    fetchUsers();
  }, [firebase]);

  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
    setSelectedRole(users.find(([id]) => id === userId)[1].role || "");
  };

  const handleAssignRole = () => {
    if (selectedUser) {
      firebase.database().ref(`users/${selectedUser}/role`).set(selectedRole);
    }
  };

  const handleRevokeRole = () => {
    if (selectedUser) {
      firebase.database().ref(`users/${selectedUser}/role`).remove();
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <select onChange={(e) => handleSelectUser(e.target.value)}>
        <option value="">Select User</option>
        {users.map(([id, user]) => (
          <option key={id} value={id}>
            {user.displayName || user.email}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Role"
        value={selectedRole}
        onChange={(e) => setSelectedRole(e.target.value)}
      />
      <button onClick={handleAssignRole}>Assign Role</button>
      <button onClick={handleRevokeRole}>Revoke Role</button>
    </div>
  );
}
