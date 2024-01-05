export function getToDos() {
  let toDos = JSON.parse(localStorage.getItem("to-do"));
  if (toDos === null) {
    return [];
  } else return toDos;
}

export function onSubmit({ setToDoItems, toDoItems, watch }) {
  const newEntryText = watch("new-entry-input");
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
  // to add 
  // // Clear input field
  // // Set focus to input field
  // // Clear search field when new list item added
}

export function removeAllCompleted({ setToDoItems, toDoItems }) {
  const updatedToDoItems = toDoItems.filter((item) => !item.completed);
  setToDoItems(updatedToDoItems);
  const itemsJSON = JSON.stringify(updatedToDoItems);
  localStorage.setItem("to-do", itemsJSON);
}

export const handleFilter = (selectedFilter, { setItemSearch, setFilter }) => {
  setFilter(selectedFilter);
  // Clears search field when button filters used
  setItemSearch("");
};