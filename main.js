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
        <span class="brief">
            <input onchange="checkThis(this)" class="checkss" type="checkbox" name="" id="" />
            <span class="taskTitle fw-bold">${data.text}</span>
            <i onclick="toggleThis(this)" class="fa-solid fa-caret-down icon"></i>
        </span>
        <div class="more">
            <span class="small text-secondary">${data.date}</span>
            <p>${data.description}</p>
            <span class="options">
                <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                <i onclick="deleteTask(this)" class="fa-solid fa-trash-can"></i>
            </span>
        </div>
    </div>
    `;
  resetForm();
};

let deleteTask = (e) => {
  e.parentElement.parentElement.parentElement.remove();
  saveData();
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement.parentElement;
  textInput.value = selectedTask.children[0].children[1].innerHTML;
  dateInput.value = selectedTask.children[1].children[0].innerHTML;
  textarea.value = selectedTask.children[1].children[1].innerHTML;
  selectedTask.remove();
  saveData();
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// for Local storage feature
let saveData = () => {
  localStorage.setItem("Data", tasks.innerHTML);
};

let showSavedData = () => {
  tasks.innerHTML = localStorage.getItem("Data");
};

// showSavedData();

// extra feature *******
const icon = document.querySelectorAll(".icon");
const more = document.querySelectorAll(".more");
const checkss = document.querySelectorAll(".checkss");
const taskTitle = document.querySelectorAll(".taskTitle");

// check.addEventListener("change", (e) => {
//   e.preventDefault();
//   if (check.checked) {
//     // line
//     taskTitle.style.textDecoration = "line-through";
//   } else {
//     // no line
//     taskTitle.style.textDecoration = "none";
//   }
// });

let checkThis = (el) => {
  let selectedDiv = el.parentElement;
  // for (let i = 0; i < checkss.length; i++) {
  // checkss[i].addEventListener("change", (e) => {
  // e.preventDefault();
  if (el.checked) {
    // line
    console.log("checked");
    selectedDiv.children[1].style.textDecoration = "line-through";
  } else {
    // no line
    console.log("Unchecked");
    selectedDiv.children[1].style.textDecoration = "none";
  }
  saveData();
  // });
  // }
};

let toggleThis = (el) => {
  let selectedDiv = el.parentElement.parentElement;
  // for (let i = 0; i < icon.length; i++) {
  // e.preventDefault();
  if (el.classList.contains("active")) {
    el.classList.remove("active");
    selectedDiv.children[1].style.display = "none";
  } else {
    el.classList.add("active");
    selectedDiv.children[1].style.display = "block";
  }
  // }
  saveData();
};

// saveData();

showSavedData();

// for (let checks of checkss) {
//   checks.addEventListener("change", (e) => {
//     e.preventDefault();
//     if (checks.checked) {
//       console.log("checked: ", checks.value);
//       this.taskTitle.style.textDecoration = "line-through";
//     } else {
//       console.log("unchecked: ", checks.value);
//       taskTitle.style.textDecoration = "none";
//     }
//   });
// }

// icon.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (icon.classList.contains("active")) {
//     icon.classList.remove("active");
//     more.style.display = "none";
//   } else {
//     icon.classList.add("active");
//     more.style.display = "block";
//   }
// });

// icon.forEach((e1, e2) =>
//   e1.addEventListener("click", (e) => {
//     e.preventDefault();
//     if (e1.classList.contains("active")) {
//       e1.classList.remove("active");
//       e2.style.display = "none";
//     } else {
//       e1.classList.add("active");
//       e2.style.display = "block";
//     }
//   })
// );
