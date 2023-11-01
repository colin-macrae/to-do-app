import "./Home.css";
import ListItems from "./ListItems";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Home() {
  const [toDoItems, setToDoItems] = useState([]);
  const [filter, setFilter] = useState("all");

  const index = new Date();

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
    const updatedToDoItems = [...toDoItems];
    updatedToDoItems.unshift(newEntry);
    setToDoItems(updatedToDoItems);
    const itemsJSON = JSON.stringify(updatedToDoItems);
    localStorage.setItem("to-do", itemsJSON);

    // Clear input field
    document.querySelector('input[name="new-entry"]').value = "";

    // Set focus to input field
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


  let completedExist = false;
  function checkCompleted() {
    const completedItems = [];
    for (let i = 0; i < toDoItems.length; i++) {
      if (toDoItems[i].completed === true) {
        completedItems.push(toDoItems[i].completed);
      } 
    }  
    if (completedItems.length === 0) return;
    else completedExist = true;
  }
  checkCompleted();  

  return (
    <div className="container">
      <section className="body">
        <h1>To-do List</h1>
        <div className="buttons">
          <button onClick={() => handleFilter("all")}>All</button>
          <button onClick={() => handleFilter("active")}>Active</button>
          <button onClick={() => handleFilter("completed")}>Completed</button>
        </div>
        <form className="form">
          <label htmlFor="new-entry"></label>
          <input
            className="text-input-box"
            type="text"
            name="new-entry"
            placeholder="enter new to-do"
          />
          <button className="save-btn" type="button" onClick={handleSubmit}>
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
            // Create toDoItems copy
            const updatedToDoItems = [...toDoItems];
            // Reorder the items upon drag-drop
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
                  className="list-items-container"
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

        <button className={completedExist ? "remove-completed-btn" : "no-completed-items"} onClick={removeAllCompleted}>
          Remove Completed
        </button>
      </section>
    </div>
  );
}
