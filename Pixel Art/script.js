const heightInput = document.getElementById("height-range");
const heightLabel = document.getElementById("height-label");
const widthInput = document.getElementById("width-range");
const widthLabel = document.getElementById("width-label");
const create = document.getElementById("create");
const clear = document.getElementById("clear");
const colorInput = document.querySelector("input[type='color']");
const paint = document.getElementById("paint");
const erase = document.getElementById("erase");
const pixelContainer = document.querySelector(".pixels-container");
const drawArea = document.querySelector(".draw-area");

const events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    mobe: "touchmove",
    up: "touchend",
  },
};

let eraseFlag = false;
let drawFlag = false;

function isDeviceTouchable() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (err) {
    return false;
  }
}

const deviceType = isDeviceTouchable() ? "touch" : "mouse";

const PaintGrid = (eleId) => {
  const grid = document.querySelectorAll(".col");
  grid.forEach((ele) => {
    if (ele === eleId) {
      if (drawFlag && !eraseFlag) {
        ele.style.backgroundColor = colorInput.value;
      } else if (drawFlag && eraseFlag) {
        ele.style.backgroundColor = "transparent";
      }
    }
  });
};

create.addEventListener("click", () => {
  pixelContainer.innerHTML = "";
  pixelContainer.style.display = "block";
  const h = heightInput.value,
    w = widthInput.value;
  let count = 0;
  for (let i = 0; i < h; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < w; j++) {
      const col = document.createElement("div");
      col.classList.add("col");
      count++;
      col.setAttribute("id", `pixel${count}`);
      col.addEventListener(events[deviceType].down, () => {
        drawFlag = true;
        if (eraseFlag) {
          col.style.backgroundColor = "transparent";
        } else if (!eraseFlag) {
          col.style.backgroundColor = colorInput.value;
        }
      });
      col.addEventListener(events[deviceType].move, (e) => {
        const eleId = document.elementFromPoint(
          isDeviceTouchable() ? e.touches[0].clientX : e.clientX,
          isDeviceTouchable() ? e.touches[0].clientY : e.clientY
        );
        PaintGrid(eleId);
      });
      col.addEventListener(events[deviceType].up, () => {
        drawFlag = false;
      });
      row.appendChild(col);
    }
    pixelContainer.appendChild(row);
  }
});

paint.addEventListener("click", () => {
  eraseFlag = false;
  paint.style.backgroundColor = '#9776eb';
  paint.style.color = '#fff';
  erase.style.backgroundColor = '#0f0b19';
});

erase.addEventListener("click", () => {
  eraseFlag = true;
  erase.style.backgroundColor = '#9776eb';
  erase.style.color = '#fff';
  paint.style.backgroundColor = '#0f0b19';
});

clear.addEventListener("click", () => {
  pixelContainer.innerHTML = "";
  pixelContainer.style.display = "none";
});

heightInput.addEventListener("input", (e) => {
  heightLabel.innerText =
    e.target.value > 9 ? e.target.value : `0${e.target.value}`;
});

widthInput.addEventListener("input", (e) => {
  widthLabel.innerText =
    e.target.value > 9 ? e.target.value : `0${e.target.value}`;
});

window.onload = () => {
  heightInput.value = 0;
  widthInput.value = 0;
  pixelContainer.style.display = "none";
};
