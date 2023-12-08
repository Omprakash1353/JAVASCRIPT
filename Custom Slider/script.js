// "use strict";

const container = document.querySelector(".container");
const left = document.getElementById("left");
const right = document.getElementById("right");
const wrapper = document.querySelector(".wrapper");
let crcle = document.getElementsByClassName("circle");

const len = container.children.length - 1;
const slideSize = 460;
const maxSize = len * slideSize;
let curr = 0;

const f = () => {
  const intervalId = setInterval(() => {
    if (curr >= maxSize) {
      container.style.left = `0px`;
      curr = 0;
    } else {
      container.style.left = `-${curr + slideSize}px`;
      curr += slideSize;
    }
    checker(curr);
  }, 4000);
  return () => clearInterval(intervalId);
};

left.addEventListener("click", () => {
  if (curr <= 0) {
    container.style.left = `-${maxSize}px`;
    curr = maxSize;
  } else {
    container.style.left = `-${curr - slideSize}px`;
    curr -= slideSize;
  }
  checker(curr);
});

right.addEventListener("click", () => {
  if (curr >= maxSize) {
    container.style.left = `0px`;
    curr = 0;
  } else {
    container.style.left = `-${curr + slideSize}px`;
    curr += slideSize;
  }
  checker(curr);
});

function checker(id) {
  for (let i = 0; i < maxSize; i++) {
    if (crcle[i].id == id) {
      crcle[i].style.width = "30px";
    } else {
      crcle[i].style.width = "10px";
    }
  }
}

const create = () => {
  const circle = document.createElement("div");
  circle.classList.add("circles");
  for (let i = 0; i < len + 1; i++) {
    const div = document.createElement("div");
    div.setAttribute("id", i * slideSize);
    div.classList.add("circle");
    circle.appendChild(div);
    div.addEventListener("click", () => {
      container.style.left = `-${div.id}px`;
      curr = div.id;
      checker(+div.id);
    });
  }
  wrapper.appendChild(circle);
};

create();

f();
