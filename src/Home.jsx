import "./Home.css";
import { useState } from "react";

export default function Home() {
  const [toDoItems, setToDoItems] = useState([
    { text: "", completed: false, selected: false },
  ]);

  function handleSubmit() {
    const inputItem = document.querySelector('input[name="new-item"]').value;
    const newItemObject = [{ text: null, completed: false, selected: false }];
    newItemObject.text = inputItem;
    const newAllItems = [...toDoItems, newItemObject];
    setToDoItems(newAllItems);
  }

  console.log(toDoItems);

  return (
    <section>
      <h1>To Dos</h1>
      <form>
        <label htmlFor="new-item">New Item</label>
        <input type="text" name="new-item" />
        <button type="button" onClick={handleSubmit}>
          Save
        </button>
      </form>
      <p>{toDoItems[0].completed ? "completed" : "not completed"}</p>
    </section>
  );
}
