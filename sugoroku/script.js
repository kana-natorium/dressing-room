const totalCells = 25;
const goalPosition = totalCells - 1;
const clearText = "デプロイ完了🎉";

const events = {
  2: { text: "ClaudeCode使用量制限：2回休み", type: "rest", value: 2 },
  4: { text: "Codexさんが勝手に改善：5回休み", type: "rest", value: 5 },
  6: { text: "Geminiさんがキラリーン：3マス進む", type: "move", value: 3 },
  8: { text: "レスポンシブ崩壊：4マス戻る", type: "move", value: -4 },
  10: { text: "iPhone実機確認で表示ズレ発見：1回休み", type: "rest", value: 1 },
  12: { text: "かなの1pxチェック発動：もう一度サイコロ", type: "extraRoll", value: 1 },
  14: { text: "あかりが杏仁豆腐を要求：進行停止", type: "stop" },
  16: { text: "ClaudeCodeとCodexのレビュー合戦が始まる：1回休み", type: "rest", value: 1 },
  18: { text: "pushに失敗：2マス戻る", type: "move", value: -2 },
  20: { text: "Codexの使用感をXに書いたら、中の人が見ていた。しばらく挙動を慎重に確認する。1回休み。", type: "rest", value: 1 },
  21: { text: "ClaudeCodeがmainにpush：3マス進む", type: "move", value: 3 },
  24: { text: `ゴール：${clearText}`, type: "goal" }
};

let playerPosition = 0;
let restTurns = 0;
let extraRolls = 0;
let gameEnded = false;
let isAnimating = false;
let chessPiece;

const board = document.getElementById("board");
const diceImage = document.getElementById("diceImage");
const rollButton = document.getElementById("rollButton");
const restartButton = document.getElementById("restartButton");
const positionText = document.getElementById("positionText");
const restText = document.getElementById("restText");
const message = document.getElementById("message");
const goalEffect = document.getElementById("goalEffect");

// 出目画像を事前読み込み（出目確定時の表示遅延を防ぐ）
const diceImagePreloads = [];
for (let i = 1; i <= 6; i += 1) {
  const preload = new Image();
  preload.src = `assets/dice${i}.png?v=7`;
  diceImagePreloads.push(preload);
}

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function setMessage(text, isClear = false) {
  message.textContent = text;
  message.classList.toggle("clear", isClear);
}

function buildBoard() {
  for (let i = 0; i < totalCells; i += 1) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.position = String(i);

    if (i === 0) {
      cell.classList.add("start");
    }

    if (i === goalPosition) {
      cell.classList.add("goal");
    }

    const number = document.createElement("span");
    number.className = "number";
    number.textContent = i === 0 ? "START" : String(i);

    const detail = document.createElement("span");
    detail.textContent = events[i] ? events[i].text : "通常マス";

    cell.append(number, detail);
    board.appendChild(cell);
  }

  chessPiece = document.createElement("img");
  chessPiece.id = "chessPiece";
  chessPiece.src = "assets/chess.png?v=1";
  chessPiece.alt = "プレイヤーのチェス駒";
  board.appendChild(chessPiece);
}

function getCurrentCell() {
  return board.querySelector(`.cell[data-position="${playerPosition}"]`);
}

function positionChess(animate = true) {
  if (!chessPiece) {
    return;
  }

  const cell = getCurrentCell();
  if (!cell) {
    return;
  }

  const x = cell.offsetLeft + cell.offsetWidth / 2;
  const y = cell.offsetTop + cell.offsetHeight / 2;
  chessPiece.classList.toggle("no-transition", !animate);
  chessPiece.style.transform = `translate(${x}px, ${y}px) translate(-50%, -82%)`;
}

function updateView(animatePiece = true) {
  document.querySelectorAll(".cell").forEach((cell) => {
    const isCurrent = Number(cell.dataset.position) === playerPosition;
    cell.classList.toggle("current", isCurrent);
  });

  positionText.textContent = playerPosition === 0 ? "スタート" : `${playerPosition}マス目`;
  restText.textContent = String(restTurns);

  if (gameEnded) {
    rollButton.disabled = true;
    rollButton.textContent = "ゲーム終了";
  } else if (isAnimating) {
    rollButton.disabled = true;
    rollButton.textContent = "進行中";
  } else if (restTurns > 0) {
    rollButton.disabled = false;
    rollButton.textContent = "休みを消化";
  } else {
    rollButton.disabled = false;
    rollButton.textContent = extraRolls > 0 ? "もう一度サイコロ" : "サイコロを振る";
  }

  if (restartButton) {
    restartButton.classList.toggle("is-visible", gameEnded);
  }

  positionChess(animatePiece);
}

function clampPosition(position) {
  return Math.max(0, Math.min(goalPosition, position));
}

async function movePlayerAnimated(targetPosition) {
  const target = clampPosition(targetPosition);

  while (playerPosition !== target) {
    playerPosition += playerPosition < target ? 1 : -1;
    updateView(true);
    await sleep(520);
  }
}

function showGoalEffect() {
  if (!goalEffect) {
    return;
  }

  goalEffect.classList.remove("show");
  void goalEffect.offsetWidth;
  goalEffect.classList.add("show");
}

function finishGame(text = clearText) {
  gameEnded = true;
  const isClear = text.includes(clearText);
  const isGameOver = text.includes("進行停止");
  const endMessage = isClear ? `ゴール！🎉 ${clearText}` : isGameOver ? `ゲームオーバー：${text}` : text;
  setMessage(endMessage, isClear);

  if (isClear) {
    showGoalEffect();
  }
}

async function applyEvent() {
  if (playerPosition >= goalPosition) {
    playerPosition = goalPosition;
    finishGame(clearText);
    return;
  }

  const currentEvent = events[playerPosition];

  if (!currentEvent) {
    setMessage("通常マス：何も起きなかった");
    return;
  }

  setMessage(currentEvent.text);

  if (currentEvent.type === "rest") {
    restTurns += currentEvent.value;
    return;
  }

  if (currentEvent.type === "extraRoll") {
    extraRolls += currentEvent.value;
    return;
  }

  if (currentEvent.type === "stop") {
    finishGame(currentEvent.text);
    return;
  }

  if (currentEvent.type === "move") {
    await sleep(620);
    await movePlayerAnimated(playerPosition + currentEvent.value);

    if (playerPosition >= goalPosition) {
      playerPosition = goalPosition;
      finishGame(clearText);
      return;
    }

    setMessage(`${currentEvent.text} → ${playerPosition}マス目に移動`);
  }
}

async function rollDiceAnimation(finalDice) {
  diceImage.classList.remove("rolling", "rolled");
  diceImage.classList.add("dice-reset");
  await sleep(40);
  diceImage.classList.remove("dice-reset");
  diceImage.classList.add("rolling");

  await sleep(1450);

  diceImage.src = `assets/dice${finalDice}.png?v=7`;
  diceImage.alt = `サイコロの出目 ${finalDice}`;
  diceImage.classList.remove("rolling");
  diceImage.classList.add("rolled");
}

async function rollDice() {
  if (gameEnded || isAnimating) {
    return;
  }

  if (restTurns > 0) {
    restTurns -= 1;
    setMessage(`休みを消化した。残り${restTurns}回`);
    updateView();
    return;
  }

  isAnimating = true;
  updateView();

  if (extraRolls > 0) {
    extraRolls -= 1;
  }

  const dice = Math.floor(Math.random() * 6) + 1;
  setMessage("サイコロが転がっている...");
  await rollDiceAnimation(dice);

  setMessage(`${dice}が出た。${dice}マス進む`);
  await movePlayerAnimated(playerPosition + dice);
  await applyEvent();

  isAnimating = false;
  updateView();
}

function resetGame() {
  playerPosition = 0;
  restTurns = 0;
  extraRolls = 0;
  gameEnded = false;
  isAnimating = false;

  diceImage.classList.remove("rolling", "rolled", "dice-reset");
  diceImage.src = "assets/dice1.png?v=7";
  diceImage.alt = "サイコロの出目 1";

  if (goalEffect) {
    goalEffect.classList.remove("show");
  }

  setMessage("サイコロを振ってスタート！");
  updateView(false);
}

buildBoard();
updateView(false);
window.addEventListener("resize", () => positionChess(false));
rollButton.addEventListener("click", rollDice);
restartButton.addEventListener("click", resetGame);