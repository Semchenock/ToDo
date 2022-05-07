const addBtn = document.querySelector(".add.btn");
const textArea = document.querySelector(".textarea");
const confirmBtn = document.querySelector(".confirm.btn");
const closeBtn = document.querySelector(".cancel.btn");
const form = document.querySelector(".task.form");
const dropZones = document.querySelectorAll(".block");
const dragItems = document.querySelectorAll(".task[draggable]");
// const taskLists = document.querySelectorAll(".tasks");

let draggedItem = null;
let droppedItem = null;

function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
function insertBefore(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode);
}
function callAddForm() {
  form.style.display = "flex";
  addBtn.style.display = "none";
}
function hideAddForm() {
  form.style.display = "none";
  addBtn.style.display = "flex";
  textArea.textContent = "";
}
function addTask(text) {
  if (text !== "") {
    const newTask = document.createElement("p");
    const dataItem = Date.now();
    dataItem.toString();
    newTask.textContent = text;
    newTask.setAttribute("class", "task");
    newTask.setAttribute("draggable", "true");
    newTask.setAttribute("data-item", dataItem);
    hideAddForm();
    insertAfter(newTask, form);
    addListners(newTask);
  }
}

function addListners(dragItem) {
  dragItem.addEventListener("dragstart", handlerDragstart);
  dragItem.addEventListener("dragend", handlerDragend);
  dragItem.addEventListener("dragenter", () => {
    if (dragItem !== draggedItem) {
      droppedItem = dragItem;
    }
  });
  dragItem.addEventListener("dragleave", () => {
    droppedItem = null;
  });
}
function handlerDragstart(e) {
  draggedItem = this;
  this.classList.add("dragItem--active");
}
function handlerDragend(e) {
  draggedItem = null;
  this.classList.remove("dragItem--active");
}
function handlerDragenter(e) {
  e.preventDefault();
}
function handlerDragover(e) {
  e.preventDefault();
}
function handlerDrop(e) {
  if (droppedItem) {
    if (droppedItem.parentElement === draggedItem.parentElement) {
      const children = Array.from(draggedItem.parentElement.children);
      const indexOfDropped = children.indexOf(droppedItem);
      const indexOfDragged = children.indexOf(draggedItem);
      if (indexOfDropped > indexOfDragged) {
        insertAfter(draggedItem, droppedItem);
      } else {
        insertBefore(draggedItem, droppedItem);
      }
    } else {
      insertAfter(draggedItem, droppedItem);
    }
  } else {
    const zoneFlag = this.dataset.zone;
    const taskList = document.querySelector(`.${zoneFlag}.tasks`);
    taskList.append(draggedItem);
  }
}

addBtn.addEventListener("click", callAddForm);
confirmBtn.addEventListener("click", () => {
  addTask(textArea.textContent);
});
closeBtn.addEventListener("click", hideAddForm);

dragItems.forEach((dragItem) => {
  addListners(dragItem);
});
dropZones.forEach((dropZone) => {
  dropZone.addEventListener("dragenter", handlerDragenter);
  dropZone.addEventListener("dragover", handlerDragover);
  dropZone.addEventListener("drop", handlerDrop);
});
console.log(dragItems);
