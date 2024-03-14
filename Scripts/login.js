const signUp = document.getElementById("sign-up");

const addedDiv = document.getElementById("todoList");
function addToDo() {
  const userInput = document.getElementById("todoInput").value;

  if (userInput.length == 0) {
    alert("Please enter a task");
    return;
  }

  const outerWrapper = document.createElement("div");
  outerWrapper.id = addedDiv.children.length;

  const content = document.createElement("p");
  content.innerText = userInput;
  content.addEventListener("click", function () {
    doneItem(outerWrapper.id);
    // saveLocal();
  });
  const trashIcon = document.createElement("i");

  trashIcon.className = "fa-solid fa-trash";
  trashIcon.addEventListener("click", function () {
    deleteItem(outerWrapper.id);
  });

  outerWrapper.appendChild(content);
  outerWrapper.appendChild(trashIcon);
  addedDiv.appendChild(outerWrapper);

  content.style.width = "100%";
  content.style.height = "80%";
  content.style.padding = "2%";
  content.style.wordWrap = "break-word";
  content.style.cursor = "pointer";

  outerWrapper.style.display = "flex";
  outerWrapper.style.maxWidth = "100%";
  outerWrapper.style.height = "fit-content";

  trashIcon.style.position = "absolute";
  trashIcon.style.right = "12%";
  trashIcon.style.marginTop = "0.5%";
  trashIcon.style.fontSize = "25px";
  trashIcon.style.cursor = "pointer";

  document.getElementById("todoInput").value = "";
}

function deleteItem(id) {
  const toDelete = document.getElementById(id);
  if (toDelete) {
    toDelete.remove();
    // saveLocal();
  }
}

function doneItem(id) {
  const toDone = document.getElementById(id);
  if (toDone) {
    const currentStyle = toDone.style.textDecoration || "";
    if (currentStyle === "line-through") {
      toDone.style.textDecoration = "none";
    } else {
      toDone.style.textDecoration = "line-through";
    }

    toDone.style.cursor = "pointer";
    // saveLocal();
  }
}

signUp.addEventListener("click", () => {
  window.location.href = "/HTML/signup.html";
});
