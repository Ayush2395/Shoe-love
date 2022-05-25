const navLink = document.querySelectorAll(".nav-link");
const burger = document.querySelector(".burger");

navLink.forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.add("collapsed");
  });
});

console.log("hello");
