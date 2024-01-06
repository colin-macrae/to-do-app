import "./Home.css";
import ListItems from "./ListItems";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getToDos, onSubmit, removeAllCompleted, handleFilter } from "./HomeUtils";
import { useForm } from "react-hook-form"

export default function Home() {
  const [toDoItems, setToDoItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [itemSearch, setItemSearch] = useState("");

  const { handleSubmit, watch, register, reset } = useForm();

  useEffect(() => {
    const toDos = getToDos();
    setToDoItems(toDos);
  }, []);
  
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
            onClick={() => handleFilter("all", { setItemSearch, setFilter })}
            className={filter === "all" ? "filtered-btn-active" : ""}
          >
            All
          </button>
          <button
            onClick={() => handleFilter("active", { setItemSearch, setFilter })}
            className={filter === "active" ? "filtered-btn-active" : ""}
          >
            Active
          </button>
          <button
            onClick={() =>
              handleFilter("completed", { setItemSearch, setFilter })
            }
            className={filter === "completed" ? "filtered-btn-active" : ""}
          >
            Completed
          </button>
          <form>
            <input
              // Added a unique "search-input" class instead of using "text-input-box" due to .blur() method conflicts.  Only one input field blurs when .blur() is used and two input fields have the same class.
              className="search-input"
              type="text"
              name="search"
              placeholder="Search to-dos"
              value={itemSearch}
              onChange={(e) => setItemSearch(e.target.value)}
              autoComplete="off"
            />
          </form>
        </div>

        <form
          onSubmit={handleSubmit(() =>
            onSubmit({ toDoItems, setToDoItems, watch, reset })
          )}
          className="form"
        >
          <input
            className="new-item-input text-input-box"
            {...register("new-entry-input")}
          />
          <input type="submit" className="save-btn" />
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
            onClick={
              filter !== "active"
                ? () => removeAllCompleted({ setToDoItems, toDoItems })
                : () => {}
            }
          >
            Remove Completed
          </button>
        </div>
      </section>
    </div>
  );
}


