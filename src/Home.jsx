import "./Home.css";
import ListItems from "./ListItems";
import { useState, useEffect } from "react";

export default function Home() {
  const [toDoItems, setToDoItems] = useState([]);
  const [filter, setFilter] = useState("all");

  const index = toDoItems.length + 1;

  function getToDos() {
    let toDos = JSON.parse(localStorage.getItem("to-do"));
    if (toDos === null) {
      return [];
    } else return toDos;
  }
  useEffect(() => {
    const toDos = getToDos();
    setToDoItems(toDos);
  }, []);

  function handleSubmit() {
    const newEntryText = document.querySelector(
      'input[name="new-entry"]'
    ).value;

    const newEntry = {
      text: newEntryText,
      completed: false,
      selected: false,
      id: index,
    };
    const updatedToDoItems = [...toDoItems, newEntry];
    setToDoItems(updatedToDoItems);
    const itemsJSON = JSON.stringify(updatedToDoItems);
    localStorage.setItem("to-do", itemsJSON);

    // Clear the input field
    document.querySelector('input[name="new-entry"]').value = "";

    // Set focus to the input field
    document.querySelector('input[name="new-entry"]').focus();

    // Prevent adding empty to-dos
    if (newEntryText.trim() === "") {
      return;
    }
  }  

  function removeAllCompleted() {    
    const updatedToDoItems = toDoItems.filter((item) => !item.completed);    
    setToDoItems(updatedToDoItems)
    const itemsJSON = JSON.stringify(updatedToDoItems);
    localStorage.setItem("to-do", itemsJSON);
  }

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <section>
      <h1>To-do List</h1>
      <div>
        <button onClick={() => handleFilter("all")}>All</button>
        <button onClick={() => handleFilter("completed")}>Completed</button>
        <button onClick={() => handleFilter("active")}>Active</button>
      </div>
      <form>
        <label htmlFor="new-entry"></label>
        <input type="text" name="new-entry" placeholder="enter new to-do" />
        <button type="button" onClick={handleSubmit}>
          Save
        </button>
      </form>
      {toDoItems.map((item, id) => {
        const itemClassName =
    (filter === "completed" && !item.completed) ||
    (filter === "active" && item.completed)
      ? "hidden"
      : "";

        return (
          <div key={id} className={itemClassName}>
            <ListItems
              toDoItem={item}
              setToDoItems={setToDoItems}
              toDoItems={toDoItems}
            />
          </div>
        );
      })}

      <button onClick={removeAllCompleted}>Remove Completed</button>
    </section>
  );
}



