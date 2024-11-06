import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define a TypeScript interface to describe the shape of each user object
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

function UserList() {
  // Set the type of the state to be an array of User objects
  const [listOfUsers, setListOfUsers] = useState<User[]>([]);
  
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch data from API when the component mounts
  useEffect(() => {
    axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        setListOfUsers(response.data); // Save fetched data to state
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  // Filter users based on search term
  const filteredUsers = listOfUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list p-6">
      <h1 className="text-3xl font-bold mb-6">User Directory</h1>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name"
        className="p-2 border rounded mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
      />
      <ul className="space-y-4">
        {/* Render filtered users */}
        {filteredUsers.map((user) => (
          <li key={user.id} className="bg-black p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Username: {user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
