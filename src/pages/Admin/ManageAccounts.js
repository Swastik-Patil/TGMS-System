// AdminPage.js
import React, { useState, useEffect, useContext } from "react";
import { getDatabase, ref as Ref, child, get, remove } from "firebase/database";

import { useFirebase } from "../../contexts/FirebaseContext";
export default function ManageAccounts() {
  const firebase = useFirebase();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [faculty, setFacutly] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    const usersSnapshot = await get(child(Ref(getDatabase()), "users"));
    const usersData = usersSnapshot.val();
    const usersArray = usersData ? Object.entries(usersData) : [];
    setUsers(usersArray);
    console.log(usersArray[0][1]);

    let d = Object.keys(usersArray[0][1]).map((key) => {
      return usersArray[0][1][key];
    });
    setFacutly(d);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelectUser = (userId) => {
    setSelectedUser(userId);
    // setSelectedRole(faculty.find((ele) => ele.userId === userId)[1].role || "");
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
    <>
      {loading ? (
        <div> Test </div>
      ) : (
        <div>
          <h1>Admin Page</h1>
          <select onChange={(e) => handleSelectUser(e.target.value)}>
            <option value="">Select User</option>
            {faculty.map((ele) => (
              <option key={ele.userId} value={ele.userId}>
                {ele.displayName || ele.email}
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
      )}
    </>
  );
}
