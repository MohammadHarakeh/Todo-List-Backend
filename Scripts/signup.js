document.addEventListener("DOMContentLoaded", function () {
  const back = document.getElementById("back");
  const formWrapper = document.getElementById("form-wrapper");
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

    console.log("clicked");
    if (password !== confirmPassword) {
      errorMessage.textContent = "Passwords do not match. Try again.";
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);

    fetch("http://127.0.0.1/todo-list-backend/backend/signup.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
