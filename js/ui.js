export function renderCards(cards, cardImgUrl) {
  for (let i = 1; i <= 6; i++) {
    const slot = document.getElementById("s" + i);
    if (!slot) continue;

    slot.innerHTML = "";
    const v = cards[i - 1];

    if (v != null) {
      const img = document.createElement("img");
      img.src = cardImgUrl(String(v));
      slot.appendChild(img);
    }
  }
}

export function renderResult(runResult, matrixResult, betSuggestion) {
  const runInfoEl = document.getElementById("runInfo");
  const runFinalEl = document.getElementById("runFinal");
  const matrixInfoEl = document.getElementById("matrixInfo");
  const matrixFinalEl = document.getElementById("matrixFinal");

  // ✅ 中間過程不顯示（只留結果）
  if (runInfoEl) runInfoEl.innerText = "";
  if (matrixInfoEl) matrixInfoEl.innerText = "";

  runFinalEl.innerText = `結果：${runResult?.final || "—"}`;
  matrixFinalEl.innerText = `結果：${matrixResult?.final || "—"}`;

  runFinalEl.classList.remove("text-banker", "text-player");
  matrixFinalEl.classList.remove("text-banker", "text-player");

  if (runResult?.final === "莊") runFinalEl.classList.add("text-banker");
  else if (runResult?.final === "閒") runFinalEl.classList.add("text-player");

  if (matrixResult?.final === "莊") matrixFinalEl.classList.add("text-banker");
  else if (matrixResult?.final === "閒") matrixFinalEl.classList.add("text-player");

  const betTextEl = document.getElementById("betTextLabel");
  const betMetaEl = document.getElementById("betMeta");
  const betLightEl = document.getElementById("betLight");

  betTextEl.classList.remove("text-banker", "text-player");
  betTextEl.innerText = `下注建議：${betSuggestion?.text || ""}`;
  betMetaEl.innerText = betSuggestion?.meta || "—";

  betLightEl.className = "bet-light";
  if (betSuggestion?.light) betLightEl.classList.add(betSuggestion.light);

  // 只有真的 BET 才上色
  if (betSuggestion?.action === "BET") {
    if (betSuggestion?.dir === "莊") betTextEl.classList.add("text-banker");
    else if (betSuggestion?.dir === "閒") betTextEl.classList.add("text-player");
  }
}

export function renderStats(betCount, hitCount, phaseText) {
  document.getElementById("betCount").innerText = String(betCount);
  document.getElementById("hitCount").innerText = String(hitCount);

  const rateEl = document.getElementById("hitRate");
  if (betCount > 0) {
    const rate = ((hitCount / betCount) * 100).toFixed(1);
    rateEl.innerText = `命中率：${rate}%`;
  } else {
    rateEl.innerText = "命中率：—";
  }

  const phaseEl = document.getElementById("phase");
  if (phaseEl) {
    phaseEl.innerText = phaseText || "盤況：—";
  }
}

export function resetUIKeepColon() {
  const runInfoEl = document.getElementById("runInfo");
  const matrixInfoEl = document.getElementById("matrixInfo");
  if (runInfoEl) runInfoEl.innerText = "";
  if (matrixInfoEl) matrixInfoEl.innerText = "";

  const runFinalEl = document.getElementById("runFinal");
  runFinalEl.innerText = "結果：—";

  const matrixFinalEl = document.getElementById("matrixFinal");
  matrixFinalEl.innerText = "結果：—";

  runFinalEl.classList.remove("text-banker", "text-player");
  matrixFinalEl.classList.remove("text-banker", "text-player");

  const betTextEl = document.getElementById("betTextLabel");
  const betMetaEl = document.getElementById("betMeta");
  const betLightEl = document.getElementById("betLight");

  betTextEl.innerText = "下注建議：";
  betTextEl.classList.remove("text-banker", "text-player");
  betMetaEl.innerText = "—";
  betLightEl.className = "bet-light";
}
