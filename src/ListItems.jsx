import './Home.css'

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
  }

  return (
    <div className="list-item">
      <input type="checkbox" checked={completed} onChange={toggleCompleted} />
      <p onClick={toggleCompleted}>
        {completed ? <strike>{text}</strike> : text}
      </p>
      <button onClick={removeItem}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}



