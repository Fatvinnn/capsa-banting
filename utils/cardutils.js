const SUITS = ['♦', '♣', '♥', '♠'];
const VALUES = [3,4,5,6,7,8,9,10,11,12,13,14,15]; // A = 14, 2 = 15

function generateDeck() {
  const deck = [];
  for (let suit of SUITS) {
    for (let value of VALUES) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function cardToString(card) {
  const face = (card.value === 11) ? 'J' :
               (card.value === 12) ? 'Q' :
               (card.value === 13) ? 'K' :
               (card.value === 14) ? 'A' :
               (card.value === 15) ? '2' : card.value;
  return face + card.suit;
}

function sortHand(hand) {
  return hand.sort((a, b) => a.value - b.value || SUITS.indexOf(a.suit) - SUITS.indexOf(b.suit));
}
