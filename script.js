const addBtn = document.querySelector(".add.btn");
const zoneArr = document.querySelectorAll(".tasks");
const textArea = document.querySelector(".textarea");
const confirmBtn = document.querySelector(".confirm.btn");

function callAddForm() {
  zoneArr[0].prepend(addForm);
}

addBtn.addEventListener("click", callAddForm);
textArea.addEventListener("click", () => {
  console.log(1);
});
confirmBtn.addEventListener("click", () => {
  console.log(textArea.textContent);
});
