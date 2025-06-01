let hands = [];
let currentPlayer = 0;
let currentCombo = null;
let passesInRow = 0;

window.onload = () => {
  initGame();
  document.getElementById('play-button').onclick = playSelected;
  document.getElementById('pass-button').onclick = passTurn;
};

function initGame() {
  const deck = generateDeck();
  shuffle(deck);

  hands = [
    sortHand(deck.splice(0, 13)),
    sortHand(deck.splice(0, 13)),
    sortHand(deck.splice(0, 13)),
    sortHand(deck.splice(0, 13))
  ];

  currentPlayer = 0;
  currentCombo = null;
  renderHand();
  renderStatus();
}

function renderHand() {
  const container = document.getElementById('hand-cards');
  container.innerHTML = '';
  hands[0].forEach((card, index) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.textContent = cardToString(card);
    div.onclick = () => div.classList.toggle('selected');
    container.appendChild(div);
  });
}

function renderStatus() {
  document.getElementById('current-combo').innerText = currentCombo ? 
    currentCombo.map(cardToString).join(', ') : "No combo";
  document.getElementById('current-player').innerText = `Current turn: Player ${currentPlayer + 1}`;
}

function playSelected() {
  if (currentPlayer !== 0) return;

  const selected = [...document.querySelectorAll('.card.selected')];
  if (selected.length === 0) return;

  const selectedCards = selected.map(el => {
    const text = el.textContent;
    const suit = text.slice(-1);
    const value = text.slice(0, -1);
    const val = value === 'J' ? 11 :
                value === 'Q' ? 12 :
                value === 'K' ? 13 :
                value === 'A' ? 14 :
                value === '2' ? 15 : parseInt(value);
    return { suit, value: val };
  });

  const type = detectComboType(selectedCards);
  if (!type || (currentCombo && !canBeat(selectedCards, currentCombo))) {
    alert("Invalid move!");
    return;
  }

  currentCombo = selectedCards;
  passesInRow = 0;
  hands[0] = hands[0].filter(card => !selectedCards.some(sel => card.value === sel.value && card.suit === sel.suit));
  nextTurn();
}

function passTurn() {
  if (currentPlayer !== 0) return;
  passesInRow++;
  nextTurn();
}

function nextTurn() {
  currentPlayer = (currentPlayer + 1) % 4;

  if (passesInRow >= 3) {
    currentCombo = null;
    passesInRow = 0;
    alert(`New round! Player ${currentPlayer + 1} starts.`);
  }

  if (hands[currentPlayer].length === 0) {
    alert(`Player ${currentPlayer + 1} wins!`);
    return;
  }

  renderHand();
  renderStatus();

  if (currentPlayer !== 0) {
    setTimeout(() => {
      const move = aiChooseMove(hands[currentPlayer], currentCombo);
      if (move) {
        currentCombo = move;
        hands[currentPlayer] = hands[currentPlayer].filter(c => !move.some(m => m.suit === c.suit && m.value === c.value));
        passesInRow = 0;
      } else {
        passesInRow++;
      }
      nextTurn();
