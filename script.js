const examples = Array.from({ length: 10 }, (_, i) => ({
  a: 4,
  b: i + 1,
}));

let currentIndex = 0;

function startGame() {
  document.getElementById("examples").innerHTML = "";
  document.getElementById("blocks").innerHTML = "";
  currentIndex = 0;
  createExample(examples[currentIndex].a, examples[currentIndex].b);
}

function createExample(a, b) {
  setTimeout(() => {
    const exampleContainer = document.createElement("div");
    exampleContainer.classList.add("example");

    const exampleText = document.createElement("span");
    exampleText.textContent = `${a} × ${b} = `;

    const input = document.createElement("input");
    input.type = "number";
    input.dataset.result = a * b;
    input.addEventListener("input", handleInput);
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        document.getElementById("submit").click();
      }
    });

    exampleContainer.appendChild(exampleText);
    exampleContainer.appendChild(input);
    document.getElementById("examples").appendChild(exampleContainer);

    setTimeout(() => {
      exampleContainer.style.opacity = 1;
    }, 10);

    input.focus();
  }, 500);

  setTimeout(() => createBlocks(a), 500);
}

function createBlocks(count) {
  const blocksContainer = document.getElementById("blocks");
  const blockRow = document.createElement("div");
  blockRow.classList.add("block-row");
  for (let i = 0; i < count; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    blockRow.appendChild(block);
  }
  blocksContainer.appendChild(blockRow);
}

function handleInput() {
  document.getElementById("submit").disabled = !document.querySelector(
    "input:not([disabled])"
  );
}

document.getElementById("submit").addEventListener("click", function () {
  const input = document.querySelector("input:not([disabled])");
  if (!input) return;

  const correct = parseInt(input.dataset.result, 10);
  const userAnswer = parseInt(input.value, 10);

  if (userAnswer === correct) {
    this.classList.add("right");
    setTimeout(() => {
      this.classList.remove("right");
    }, 500);
    input.style.color = "black";
    input.insertAdjacentHTML("afterend", correct);
    input.remove();

    currentIndex++;
    if (currentIndex < examples.length) {
      setTimeout(() => {
        createExample(examples[currentIndex].a, examples[currentIndex].b);
      }, 500);
    } else {
      setTimeout(startGame, 1000);
    }
  } else {
    this.classList.add("wrong");
    setTimeout(() => {
      this.classList.remove("wrong");
    }, 500);
    input.style.color = "red";
    setTimeout(() => {
      input.style.color = "black";
    }, 1000);
  }
  this.disabled = true;
});

startGame();
