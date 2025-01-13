import "./style.css";
const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("fileInput");
const fileList = document.getElementById("fileList");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// var swiper = new Swiper(".default-carousel", {
//   loop: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

<<<<<<< HEAD
// const dropzone = document.getElementById("dropzone");
// const fileInput = document.getElementById("fileInput");
// const fileList = document.getElementById("fileList");
=======
dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("border-blue-500", "border-2");
});
>>>>>>> 5113c1201952ee268008038d2330636aacc5f005

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("border-blue-500", "border-2");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("border-blue-500", "border-2");

  const files = e.dataTransfer.files;
  handleFiles(files);
});

fileInput.addEventListener("change", (e) => {
  const files = e.target.files;
  handleFiles(files);
});

function handleFiles(files) {
  fileList.innerHTML = "";

  for (const file of files) {
    const listItem = document.createElement("div");
    listItem.textContent = `${file.name} (${formatBytes(file.size)})`;
    fileList.appendChild(listItem);
  }
}

// function formatBytes(bytes) {
//   if (bytes === 0) return "0 Bytes";

//   const k = 1024;
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));

//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
// }
