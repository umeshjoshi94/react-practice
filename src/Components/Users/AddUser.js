import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  //Error state
  const [error, setError] = useState();
  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
  const addUserHandler = (event) => {
    event.preventDefault();
    //validation
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age(Non-empty-values)",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({ title: "Invalid Age", message: "Please enter valid age" });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    // Reset after clicking AddUser button
    setEnteredUsername(""); //setting empty to reset
    setEnteredAge("");
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        ></ErrorModal>
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            type="text"
            onChange={usernameChangeHandler}
            value={enteredUsername}
          />
          <label htmlFor="age">Age(years)</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={enteredAge}
          />
          <Button type="submit">AddUser</Button>
        </form>
      </Card>
    </div>
  );
};
export default AddUser;
