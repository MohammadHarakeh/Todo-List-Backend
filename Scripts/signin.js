const login = document.getElementById("login");
const errorMessage = document.getElementById("error-message");
let input;

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

login.addEventListener("click", () => {
  try {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const formData = { username: "", password: "", email: "" };

    if (isValidEmail(username)) {
      formData.email = username;
    } else {
      formData.username = username;
    }
    formData.password = password;

    fetch("http://127.0.0.1/todo-list-backend/backend/signin.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);

        if (data.status === "error") {
          errorMessage.textContent = data.message;
        } else if ((data.status = "logged in")) {
          window.location.href = "/HTML/todo.html";
          console.log("clicked");
        }
      });
  } catch (error) {
    console.error("Error:", error);
  }
});
