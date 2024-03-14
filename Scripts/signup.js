const back = document.getElementById("back");
const errorMessage = document
  .getElementById("error-message")
  .querySelector("p");
const register = document.getElementById("register");
const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;

back.addEventListener("click", () => {
  window.location.href = "/HTML/index.html";
});

register.addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match. Try again.";
  } else if (email == "" || username == "") {
    errorMessage.textContent = "Inputs can't be empty";
  } else if (!emailRegex.test(email)) {
    errorMessage.textContent = "Invalid email address";
  } else {
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
          } else {
            window.location.href = "/HTML/index.html";
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
