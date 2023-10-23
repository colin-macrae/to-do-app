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
      id: index,
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
            <ListItems toDoItems={item} setToDoItems={setToDoItems}/>
          </div>
        );
      })}
    </section>
  );
}

export function ListItems(props) {
  let { text, id } = props.toDoItems;

  const [completed, setCompleted] = useState(props.toDoItems.completed);

  function removeItem() {
    props.setToDoItems((prevToDoItems) =>
      prevToDoItems.filter((newItems) => newItems.id !== id)
    );
    console.log(props.toDoItems)
  }


  function changeCompleted() {
    setCompleted(!completed);
    console.log(completed);
  }

  return (
    <div className="list-item">
      <input type="checkbox" checked={completed} onChange={changeCompleted} />
      <p>{completed ? <strike>{text}</strike> : text}</p>
      <button onClick={removeItem}><i className="fas fa-times"></i></button>
    </div>
  );
}
