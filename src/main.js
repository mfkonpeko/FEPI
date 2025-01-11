import "./style.css";
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
