const username = document.getElementById("username").value;
const password = document.getElementById("password").value;
const login = document.getElementById("login");
const errorMessage = document.getElementById("error-message");

login.addEventListener("click", () => {
  try {
    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);

    fetch("http://127.0.0.1/todo-list-backend/backend/signin.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);

        if (data.status === "error") {
          errorMessage.textContent = data.message;
        } else if (data.status === "success") {
          //   window.location.href = "/HTML/index.html";
          console.log("clicked");
        }
      });
  } catch (error) {
    console.error("Error:", error);
  }
});
