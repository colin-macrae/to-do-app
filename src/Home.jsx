import "./Home.css";
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

    //set items to local storage
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
            <ListItems toDoItems={item} setToDoItems={setToDoItems} />
          </div>
        );
      })}

      <button onClick={removeCompleted}>Remove Completed</button>
    </section>
  );
}

export function ListItems({ toDoItems, setToDoItems }) {
  let { text, id } = toDoItems;

  const [completed, setCompleted] = useState(toDoItems.completed);

  function removeItem() {
    setToDoItems((oldItems) =>
      oldItems.filter((newItems) => newItems.id !== id)
    );
  }

  function changeCompleted() {
    setCompleted(!completed);
  }

  return (
    <div className="list-item">
      <input type="checkbox" checked={completed} onChange={changeCompleted} />
      <p>{completed ? <strike>{text}</strike> : text}</p>
      <button onClick={removeItem}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}
