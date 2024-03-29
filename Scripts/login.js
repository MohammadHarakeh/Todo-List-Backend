const signUp = document.getElementById("sign-up");
const addedDiv = document.getElementById("todoList");

fetchAndDisplayTasks();

function validateInput(input) {
  return input.trim().length > 0;
}

function getUserId() {
  return localStorage.getItem("userId");
}

function createContentDiv(userInput, taskId) {
  const outerWrapper = document.createElement("div");
  outerWrapper.id = taskId;

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const content = document.createElement("p");
  content.innerText = userInput;

  const trashIcon = createTrashIcon(taskId);

  taskDiv.appendChild(content);
  taskDiv.appendChild(trashIcon);
  outerWrapper.appendChild(taskDiv);
  addedDiv.appendChild(outerWrapper);

  styleContentDiv(content);
  styleOuterWrapper(outerWrapper);
  styleTrashIcon(trashIcon);

  return outerWrapper;
}

function createTrashIcon(taskId) {
  const trashIcon = document.createElement("i");
  trashIcon.className = "fa-solid fa-trash";
  trashIcon.addEventListener("click", function () {
    deleteTask(taskId);
  });
  return trashIcon;
}

async function deleteTask(taskId) {
  try {
    const userId = getUserId();

    if (!userId) {
      alert("User ID not found. Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("id", taskId);

    const response = await fetch(
      "http://127.0.0.1/todo-list-backend/backend/deleteToDo.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log("Response from server:", data);

    if (data.status === "success") {
      console.log("Task deleted successfully");
      deleteTaskFromDom(taskId);
    } else {
      console.error("Error deleting task:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function styleContentDiv(content) {
  content.style.width = "100%";
  content.style.height = "80%";
  content.style.padding = "2%";
  content.style.wordWrap = "break-word";
  content.style.cursor = "pointer";
}

function styleOuterWrapper(outerWrapper) {
  outerWrapper.style.position = "relative";
  outerWrapper.style.display = "flex";
  outerWrapper.style.maxWidth = "100%";
  outerWrapper.style.height = "fit-content";
}

function styleTrashIcon(trashIcon) {
  trashIcon.style.position = "absolute";
  trashIcon.style.right = "-5%";
  trashIcon.style.marginTop = "0.5%";
  trashIcon.style.fontSize = "25px";
  trashIcon.style.cursor = "pointer";
}

async function fetchAndDisplayTasks() {
  const userId = getUserId();

  if (!userId) {
    alert("User ID not found. Please log in.");
    return;
  }

  try {
    const response = await fetch(
      "http://127.0.0.1/todo-list-backend/backend/addToDo.php?user_id=" + userId
    );

    const data = await response.json();
    console.log("Data received from server:", data);

    if (data.status === "success") {
      data.tasks.forEach((task) => {
        createContentDiv(task, task.id); // Pass both task content and task id
        console.log("task ", task);
        console.log("task ID: ", task.id);
      });
    } else {
      console.error("Error fetching tasks:", data.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function addToDo() {
  const userInput = document.getElementById("todoInput").value;

  if (!validateInput(userInput)) {
    alert("Please enter a task");
    return;
  }

  const userId = getUserId();

  if (!userId) {
    alert("User ID not found. Please log in.");
    return;
  }

  const formData = new FormData();
  formData.append("user_id", userId);
  formData.append("task", userInput);
  formData.append("check_task", 0);

  fetch("http://127.0.0.1/todo-list-backend/backend/addToDo.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        console.log("Task added successfully");
        createContentDiv(userInput, data.id); // Pass the newly created task id
        document.getElementById("todoInput").value = "";
      } else {
        console.error("Error adding task:", data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function deleteTaskFromDom(taskId) {
  const taskElement = document.getElementById(taskId);
  if (taskElement) {
    taskElement.remove();
    console.log("Task deleted successfully from DOM");
  } else {
    console.error("Task element not found");
  }
}

function toggleDone(id) {
  const task = document.getElementById(id);
  if (task) {
    const currentStyle = task.style.textDecoration || "";
    task.style.textDecoration =
      currentStyle === "line-through" ? "none" : "line-through";
    task.style.cursor = "pointer";
  }
}

signUp.addEventListener("click", () => {
  window.location.href = "/HTML/signup.html";
});
