import "./Home.css";

export default function ListItems({ toDoItem, toDoItems, setToDoItems }) {
  const { text, id, completed } = toDoItem;

  function removeItem() {
    setToDoItems((oldItems) =>
      oldItems.map((item) => (item.id === id ? null : item)).filter(Boolean)
    );
    const updatedToDoItems = toDoItems.filter((item) => item.id !== id);
    const itemsJSON = JSON.stringify(updatedToDoItems);
    localStorage.setItem("to-do", itemsJSON);
  }

  function toggleCompleted() {
    const updatedToDoItems = toDoItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setToDoItems(updatedToDoItems);
    const itemsJSON = JSON.stringify(updatedToDoItems);
    localStorage.setItem("to-do", itemsJSON);

    // Removes input field's focus when toggling list items (important on mobile).  Details: Fixes input field's persistence of focus by removing the focus when list items are clicked on (toggled).  On mobile, when focus is initially in the form field, this change prevents the keyboard from popping up upon every toggle attempt.
    const inputField = document.querySelector(".text-input-box");
    inputField.blur();
  }

  return (
    <div className="list-item">
      <div className="text-container">
        <input
          className="checkbox"
          type="checkbox"
          checked={completed}
          onChange={toggleCompleted}
        />
        <p className="item-text" onClick={toggleCompleted}>
          {completed ? <strike>{text}</strike> : text}
        </p>
      </div>
      <div className="remove-btn-container">
        <button className="remove-item" onClick={removeItem}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}
