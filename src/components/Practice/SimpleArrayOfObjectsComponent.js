// import React and the useState hook
import { useState } from "react";
//import "./styles.css";

// component function 
function SimpleArrayOfObjectsComponent() {
  // set the initial state (an array with 1 object to start (this can be an empty object to start))
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Joe",
      type: "admin"
    }
  ]);

    // boolean state to know if we are editing (this will let us display
    const [isEditing, setIsEditing] = useState(false);
    // object state to set so we know which todo item we are editing
    const [currentUser, setCurrentUser] = useState({});
    // delcare the function
    function handleAddNewUser() {
      // it's important to not mutate state directly, so here we are creating a copy of the current state using the spread syntax
      const updateUsers = [
        // copy the current users state
        ...users,
        // now you can add a new object to add to the array
        {
          // using the length of the array for a unique id
          id: users.length + 1,
          // adding a new user name
          name: "Steve",
          // with a type of member
          type: "member"
        }
      ];
      // update the state to the updatedUsers
      setUsers(updateUsers);
    }

    // JSX we want to return
    return (
        // parent div to hold the ul and li's
        <div className="App">
          <ul>
            {/* map over the users array */}
            {users.map((user) => (
              // display a <div> element with the user.name and user.type
              // parent element needs to have a unique key
              <div key={user.id}>
                <p>{user.name}</p>
                <p>{user.type}</p>
              </div>
            ))}
          </ul>
          <button onClick={handleAddNewUser}>Add user</button>
        </div>
      );
            }
export default SimpleArrayOfObjectsComponent