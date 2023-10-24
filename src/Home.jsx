import "./Home.css";
import ListItems from "./ListItems";
import { useState, useEffect } from "react";

export default function Home() {
  const [toDoItems, setToDoItems] = useState([]);

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
  }  

  function removeAllCompleted() {
    
    setToDoItems(updatedToDoItems)
    const updatedToDoItems = toDoItems.filter((item) => !item.completed);    
    const itemsJSON = JSON.stringify(updatedToDoItems);
    localStorage.setItem("to-do", itemsJSON);
  }

  return (
    <section>
      <h1>To-do List</h1>
      <form>
        <label htmlFor="new-entry"></label>
        <input type="text" name="new-entry" placeholder="enter new to-do" />
        <button type="button" onClick={handleSubmit}>
          Save
        </button>
      </form>

      {toDoItems.map((item, id) => {
        return (
          <div key={id}>
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


