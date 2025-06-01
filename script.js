const SUITS = ['♦', '♣', '♥', '♠'];
const SUITS_ORDER = { '♦': 0, '♣': 1, '♥': 2, '♠': 3 };
const RANKS = [3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A', 2];
const PLAYER_NAMES = ['Kamu', 'AI'];
const AI_DELAY = 1300; // lebih responsif

let hands = [[], []];
let currentPlayer = 0;
let tableCard = null;
let gameEnded = false;
let winner = null;
let selectedIdx = null;

function createDeck() {
  let deck = [];
  for (let s = 0; s < SUITS.length; s++) {
    for (let r = 0; r < RANKS.length; r++) {
      deck.push({
        rank: RANKS[r],
        suit: SUITS[s],
        rankIndex: r,
        suitIndex: s,
      });
    }
  }
  return deck;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sortHand(hand) {
  hand.sort((a, b) => {
    if (a.rankIndex !== b.rankIndex) return a.rankIndex - b.rankIndex;
    return a.suitIndex - b.suitIndex;
  });
}

function dealCards(deck) {
  hands = [[], []];
  for (let i = 0; i < 13; i++) hands[0].push(deck[i]);
  for (let i = 13; i < 26; i++) hands[1].push(deck[i]);
  hands.forEach(sortHand);
}

function cardValue(card) {
  return card.rankIndex * 4 + card.suitIndex;
}

function canPlay(card, table) {
  if (!table) return true;
  return cardValue(card) > cardValue(table);
}

function renderAI() {
  document.getElementById('ai-cards').innerHTML = `🂠 x ${hands[1].length}`;
}

function renderUserHand() {
  document.getElementById('user-card-count').innerText = `🂠 x ${hands[0].length}`;
  const userHandDiv = document.getElementById('user-hand');
  userHandDiv.innerHTML = '';
  hands[0].forEach((card, idx) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card-hand ' + ((card.suit === '♦' || card.suit === '♥') ? 'red' : 'black');
    cardDiv.innerText = `${card.rank}${card.suit}`;
    cardDiv.onclick = () => selectCard(idx, cardDiv);
    userHandDiv.appendChild(cardDiv);
  });
}

function selectCard(idx, cardDiv) {
  if (currentPlayer !== 0 || gameEnded) return;
  Array.from(document.getElementById('user-hand').children).forEach(div => {
    div.classList.remove('selected');
  });
  cardDiv.classList.add('selected');
  selectedIdx = idx;
}

function renderTableCard() {
  const div = document.getElementById('table-card');
  if (tableCard) {
    div.innerText = `${tableCard.rank}${tableCard.suit}`;
    div.className = 'table-card ' + ((tableCard.suit === '♦' || tableCard.suit === '♥') ? 'red' : 'black');
  } else {
    div.innerText = '-';
    div.className = 'table-card';
  }
}

function logInfo(msg) {
  document.getElementById('info-log').innerText = msg;
}

function renderAll() {
  renderAI();
  renderUserHand();
  renderTableCard();
  document.getElementById('ai-last').innerText = '';
  document.getElementById('result-msg').innerText = '';
  document.getElementById('restart-btn').style.display = 'none';
  updateTurnInfo();
  document.getElementById('play-btn').disabled = (currentPlayer !== 0 || gameEnded);
  document.getElementById('pass-btn').disabled = (currentPlayer !== 0 || gameEnded || !tableCard);
}

function updateTurnInfo() {
  document.getElementById('turn-info').innerText = gameEnded
    ? ''
    : (currentPlayer === 0 ? "Giliranmu!" : "Giliran AI...");
}

function startGame() {
  let deck = shuffle(createDeck());
  dealCards(deck);
  currentPlayer = 0;
  tableCard = null;
  gameEnded = false;
  winner = null;
  selectedIdx = null;
  renderAll();
  logInfo('Pilih satu kartu lalu klik "Mainkan Kartu" atau klik "Pass".');
}

function playUser() {
  if (gameEnded || currentPlayer !== 0) return;
  if (selectedIdx === null || selectedIdx < 0 || selectedIdx >= hands[0].length) {
    logInfo('Pilih satu kartu dulu!');
    return;
  }
  const card = hands[0][selectedIdx];
  if (!canPlay(card, tableCard)) {
    logInfo('Kartu tidak valid! Harus lebih besar dari kartu meja.');
    return;
  }
  hands[0].splice(selectedIdx, 1);
  sortHand(hands[0]);
  tableCard = card;
  selectedIdx = null;
  renderAll();
  if (hands[0].length === 0) {
    endGame(0);
    return;
  }
  currentPlayer = 1;
  updateTurnInfo();
  logInfo('AI berpikir...');
  setTimeout(aiTurn, AI_DELAY);
}

function passUser() {
  if (gameEnded || currentPlayer !== 0 || !tableCard) return;
  logInfo('Kamu pass. Kartu di meja direset. Giliran AI...');
  selectedIdx = null;
  tableCard = null;
  currentPlayer = 1;
  renderAll();
  updateTurnInfo();
  setTimeout(aiTurn, AI_DELAY);
}

function aiTurn() {
  if (gameEnded) return;
  const hand = hands[1];
  let idx = hand.findIndex(card => canPlay(card, tableCard));
  if (idx !== -1) {
    const card = hand[idx];
    hand.splice(idx, 1);
    tableCard = card;
    renderAI();
    document.getElementById('ai-last').innerText = `Main: ${card.rank}${card.suit}`;
    if (hand.length === 0) {
      endGame(1);
      return;
    }
    currentPlayer = 0;
    updateTurnInfo();
    renderAll();
    logInfo('Giliranmu! Pilih kartu, klik "Mainkan Kartu" atau "Pass".');
    return;
  } else {
    document.getElementById('ai-last').innerText = 'Pass';
    logInfo('AI pass. Kartu di meja direset. Giliranmu!');
    tableCard = null;
    currentPlayer = 0;
    updateTurnInfo();
    renderAll();
    return;
  }
}

function endGame(idx) {
  gameEnded = true;
  winner = idx;
  renderAI();
  renderUserHand();
  renderTableCard();
  let msg = (idx === 0) ? 'Selamat! Kamu menang! 🎉' : `Game selesai. AI menang!`;
  document.getElementById('result-msg').innerText = msg;
  logInfo('Permainan selesai! Klik "Main Lagi" untuk bermain ulang.');
  document.getElementById('restart-btn').style.display = 'inline-block';
  updateTurnInfo();
}

document.getElementById('play-btn').onclick = playUser;
document.getElementById('pass-btn').onclick = passUser;
document.getElementById('restart-btn').onclick = startGame;

window.onload = startGame;