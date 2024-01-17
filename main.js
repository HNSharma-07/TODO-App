let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    saveData();

    add.setAttribute("data-bs-dismiss", "modal"); // to close when we click on add // attribute taken from bootstrap html code
    add.click();

    // IIF : immediatly invoked function
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = {};

let acceptData = () => {
  data["text"] = textInput.value;
  data["date"] = dateInput.value;
  data["description"] = textarea.value;

  //   console.log(data);
  createTask();
};

let createTask = () => {
  tasks.innerHTML += `
    <div>
          <span class="fw-bold">${data.text}</span>
          <span class="small text-secondary">${data.date}</span>
          <p>${data.description}</p>
          <span class="options">
            <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
            <i onclick="deleteTask(this)" class="fa-solid fa-trash-can"></i>
          </span>
        </div>
    `;
  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  saveData();
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
  selectedTask.remove();
  saveData();
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

let saveData = () => {
  localStorage.setItem("Data", tasks.innerHTML);
};

let showSavedData = () => {
  tasks.innerHTML = localStorage.getItem("Data");
};

showSavedData();
