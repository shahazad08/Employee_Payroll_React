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


  function handleUpdateUser(id, updatedUser) {
    // here we are mapping over the users array - the idea is check if the user.id matches the id we pass into the function
    // if the id's match, use the second parameter to pass in the updated user object
    // otherwise just use old user
    const updatedObject = users.map((user) =>
      user.id === id ? updatedUser : user
    );
    // set editing to false because this function will be used inside an onSubmit function - which means the data was submited and we are no longer editing
    setIsEditing(false);
    // update the users state with the updated user
    setUsers(updatedObject);
  }



  function handleEditFormSubmit(e) {
    e.preventDefault();

    // call the handleUpdateTodo function - passing the currentUser.id and the currentUser object as arguments
    handleUpdateUser(currentUser.id, currentUser);
  }

  function handleEditInputChange(e) {
    // set the new state value to what's currently in the edit input box
    setCurrentUser({ ...currentUser, name: e.target.value });
  }

  function handleEditClick(user) {
    // set isEditing to true
    setIsEditing(true);
    // update the state to the updatedUsers
    setCurrentUser({ ...user });
  }

  // JSX we want to return
  return (
    // parent div to hold the ul and li's
    <div className="App">
      {/* start - if the "edit user name" is clicked */}
      {currentUser.id && isEditing && (
        <form onSubmit={handleEditFormSubmit}>
          <input
            name="editTodo"
            type="text"
            placeholder="Edit todo"
            value={currentUser.name}
            onChange={handleEditInputChange}
          />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
      <ul>
        {/* map over the users array */}
        {users.map((user) => (
          // display a <div> element with the user.name and user.type
          // parent element needs to have a unique key
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.type}</p>
            {!isEditing && (
              <button onClick={() => handleEditClick(user)}>
                Edit user name
              </button>
            )}
          </div>
        ))}
      </ul>
      <button onClick={handleAddNewUser}>Add user</button>
    </div>
  );
}
export default SimpleArrayOfObjectsComponent