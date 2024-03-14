const back = document.getElementById("back");
const errorMessage = document
  .getElementById("error-message")
  .querySelector("p");
const register = document.getElementById("register");

back.addEventListener("click", () => {
  window.location.href = "/HTML/index.html";
});

register.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match. Try again.";
    return;
  }

  try {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);

    fetch("http://127.0.0.1/todo-list-backend/backend/signup.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response from server:", data);

        if (data.status === "error") {
          errorMessage.textContent = data.message;
        }
      });
  } catch (error) {
    console.error("Error:", error);
  }
});
