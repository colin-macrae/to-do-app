import "./Home.css";
import { useState } from "react";

export default function Home() {
  const [toDoItems, setToDoItems] = useState([]);

  const index = toDoItems.length + 1;

  function handleSubmit() {
    const newEntryText = document.querySelector(
      'input[name="new-entry"]'
    ).value;
    const newEntry = {
      text: newEntryText,
      completed: false,
      selected: false,
      id: index
    };
    const updatedToDoItems = [...toDoItems, newEntry];
    setToDoItems(updatedToDoItems);
  }

  console.log(toDoItems);

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
            <ListItems toDoItems={item} />
          </div>
        );
      })}
    </section>
  );
}

export function ListItems(item) {
  let { text, selected, id } = item.toDoItems;

  const [completed, setCompleted] = useState(item.toDoItems.completed);

  function changeCompleted() {
    setCompleted(!completed);
    console.log(completed);
  }

  return (
    <div className="list-item">
      <p>{completed ? <strike>{text}</strike> : text}</p>
      <input type="checkbox" checked={completed} onChange={changeCompleted} />
    </div>
  );
}
