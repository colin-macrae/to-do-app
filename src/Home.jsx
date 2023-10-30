import "./Home.css";
import ListItems from "./ListItems";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

    // Prevent adding empty to-dos
    if (newEntryText.trim() === "") {
      return;
    }

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
  }

  function removeAllCompleted() {
    const updatedToDoItems = toDoItems.filter((item) => !item.completed);
    setToDoItems(updatedToDoItems);
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
        <button onClick={() => handleFilter("active")}>Active</button>
        <button onClick={() => handleFilter("completed")}>Completed</button>
      </div>
      <form>
        <label htmlFor="new-entry"></label>
        <input type="text" name="new-entry" placeholder="enter new to-do" />
        <button type="button" onClick={handleSubmit}>
          Save
        </button>
      </form>

      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) {
            return; 
          }
          const startIndex = result.source.index;
          const endIndex = result.destination.index;
          const updatedToDoItems = [...toDoItems];
          const [draggedItem] = updatedToDoItems.splice(startIndex, 1);
          updatedToDoItems.splice(endIndex, 0, draggedItem);
          setToDoItems(updatedToDoItems);
          const itemsJSON = JSON.stringify(updatedToDoItems);
          localStorage.setItem("to-do", itemsJSON);
        }}
      >
        {toDoItems.length > 0 && (
          <Droppable droppableId="to-do" type="group">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {toDoItems.map((item, index) => {
                  const itemClassName =
                    (filter === "completed" && !item.completed) ||
                    (filter === "active" && item.completed)
                      ? "hidden"
                      : "";

                  return (
                    <Draggable
                      draggableId={item.id.toString()}
                      key={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          key={item.id}
                          className={itemClassName}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <ListItems
                            toDoItem={item}
                            setToDoItems={setToDoItems}
                            toDoItems={toDoItems}
                          />
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
            
          </Droppable>
        )}
      </DragDropContext>

      <button onClick={removeAllCompleted}>Remove Completed</button>
    </section>
  );
}
