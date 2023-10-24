export default function ListItems({ toDoItem, toDoItems, setToDoItems }) {

  const { text, id, completed } = toDoItem;

  function removeItem() {
    setToDoItems((oldItems) =>
      oldItems.map((item) => (item.id === id ? null : item)).filter(Boolean)
    );
  }


  function toggleCompleted() {
    const updatedToDoItems = toDoItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setToDoItems(updatedToDoItems);
  }

  return (
    <div className="list-item">
      <input type="checkbox" checked={completed} onChange={toggleCompleted} />
      <p>{completed ? <strike>{text}</strike> : text}</p>
      <button onClick={removeItem}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}
