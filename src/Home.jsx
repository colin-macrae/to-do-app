import "./Home.css";
import { useState } from "react";

export default function Home() {
  const [toDoItems, setToDoItems] = useState([]);

  const index = toDoItems.length + 1;

  function handleSubmit() {
    const newEntryText = document.querySelector('input[name="new-entry"]').value;
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
      <h1>To Dos</h1>
      <form>
        <label htmlFor="new-entry">New Entry</label>
        <input type="text" name="new-entry" />
        <button type="button" onClick={handleSubmit}>
          Save
        </button>
      </form>      

      {toDoItems.map((item, id) => {
        return (
          <div key={id}>
            <ListItems toDoItems={item}/>
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
    <div>
      <p>{text}</p>
      <p>{id}</p>
      <p>{selected === true ? "selected" : "not selected"}</p>
      <p>{completed === true ? "completed" : "not completed"}</p>
      <button onClick={changeCompleted}>{completed ? "mark not done" : "mark done"}</button>
    </div>
  );
}
