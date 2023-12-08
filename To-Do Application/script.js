const input = document.querySelector("input");
const btn = document.querySelector("button");
const container = document.querySelector(".list-container");

btn.addEventListener("click", () => {
  if (input.value == "") return;

  const li = document.createElement("li");
  const p = document.createElement("p");
  p.innerText = input.value;
  li.appendChild(p);
  const i1 = document.createElement("i");
  i1.classList.add("fa-solid", "fa-pen-to-square");

  const i2 = document.createElement("i");
  i2.classList.add("fa-solid", "fa-trash");

  li.appendChild(i1);
  li.appendChild(i2);

  i1.addEventListener("click", () => {
    if (i1.classList.contains("fa-pen-to-square")) {
      i1.classList.remove("fa-pen-to-square");
      i1.classList.add("fa-check");

      p.contentEditable = true;
      i2.style.display = "none";

      p.removeEventListener("click", toggler);
      p.focus();
    } else if (i1.classList.contains("fa-check")) {
      i1.classList.add("fa-pen-to-square");
      i1.classList.remove("fa-check");

      p.contentEditable = false;
      i2.style.display = "block";

      p.addEventListener("click", toggler);
    }
  });

  i2.addEventListener("click", () => {
    i2.parentElement.remove();
  });

  function toggler() {
    p.classList.toggle("checked");
    if (p.classList.contains("checked")) {
      i1.style.display = "none";
    } else {
      i1.style.display = "block";
    }
  }

  p.addEventListener("click", toggler);

  container.appendChild(li);
  input.value = "";
});
