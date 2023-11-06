import "./Home.css";
import ListItems from "./ListItems";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Home() {
  const [toDoItems, setToDoItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [itemSearch, setItemSearch] = useState("");

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

    // Prevents adding empty to-dos
    if (newEntryText.trim() === "") {
      return;
    }

    const newEntry = {
      text: newEntryText,
      completed: false,
      id: Math.random(),
    };
    const updatedToDoItems = [...toDoItems];
    updatedToDoItems.unshift(newEntry);
    setToDoItems(updatedToDoItems);
    const itemsJSON = JSON.stringify(updatedToDoItems);
    localStorage.setItem("to-do", itemsJSON);

    // Clears input field
    document.querySelector('input[name="new-entry"]').value = "";

    // Sets focus to input field
    document.querySelector('input[name="new-entry"]').focus();

    // Clears search field when new list item added
    setItemSearch("");
  }

  function removeAllCompleted() {
    const updatedToDoItems = toDoItems.filter((item) => !item.completed);
    setToDoItems(updatedToDoItems);
    const itemsJSON = JSON.stringify(updatedToDoItems);
    localStorage.setItem("to-do", itemsJSON);
  }

  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
    // Clears search field when other filters used
    setItemSearch("");
  };

  // Allows "enter" key for form submission
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Handles pressing "enter" on mobile.  Hides keyboard and returns focus
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.querySelector(".search-input").blur();
      //Includes all items in filter results (i.e. both active & completed)
      setFilter("all");
    }
  };

  // Filters toDoItems based on search field value, to then be mapped
  const filteredToDoItems = toDoItems.filter((item) =>
    item.text.toLowerCase().includes(itemSearch.toLowerCase())
  );

  // Finds whether completed items exist (for "remove completed" btn conditional styling)
  const hasCompleted = toDoItems.some((item) => item.completed === true);

  return (
    <div className="container">
      <section className="body">
        <h1>My To-dos</h1>
        <div className="filter-section">
          <button
            onClick={() => handleFilter("all")}
            className={filter === "all" ? "filtered-btn-active" : ""}
          >
            All
          </button>
          <button
            onClick={() => handleFilter("active")}
            className={filter === "active" ? "filtered-btn-active" : ""}
          >
            Active
          </button>
          <button
            onClick={() => handleFilter("completed")}
            className={filter === "completed" ? "filtered-btn-active" : ""}
          >
            Completed
          </button>
          <form>
            <input
              className="search-input text-input-box"
              type="text"
              name="search"
              placeholder="Search to-dos"
              value={itemSearch}
              onChange={(e) => setItemSearch(e.target.value)}
              autoComplete="off"
              onKeyPress={handleSearchSubmit}
            />
          </form>
        </div>
        <form className="form">
          <input
            className="new-item-input text-input-box"
            type="text"
            name="new-entry"
            placeholder="enter new to-do"
            autoComplete="off"
            onKeyPress={handleKeyPress}
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
            // Creates toDoItems copy
            const updatedToDoItems = [...toDoItems];
            // Reorders items upon drag-drop
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
                  {filteredToDoItems.map((item, index) => {
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

        <div className="remove-completed-btn-container">
          <button
            className={
              hasCompleted && filter !== "active"
                ? "remove-completed-btn"
                : "no-completed-items"
            }
            //Empty arrow function sets ternary to do nothing
            onClick={filter !== "active" ? removeAllCompleted : () => {}}
          >
            Remove Completed
          </button>
        </div>
      </section>
    </div>
  );
}
