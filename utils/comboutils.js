function detectComboType(cards) {
  if (cards.length === 1) return "single";

  const allSame = cards.every(card => card.value === cards[0].value);

  if (cards.length === 2 && allSame) return "pair";
  if (cards.length === 3 && allSame) return "triple";

  return null;
}

function canBeat(comboA, comboB) {
  const typeA = detectComboType(comboA);
  const typeB = detectComboType(comboB);

  if (!typeA || !typeB || typeA !== typeB) return false;

  const highestA = getHighestCard(comboA);
  const highestB = getHighestCard(comboB);

  return compareCard(highestA, highestB) > 0;
}

function getHighestCard(cards) {
  return cards.reduce((max, card) => {
    return compareCard(card, max) > 0 ? card : max;
  }, cards[0]);
}

function compareCard(cardA, cardB) {
  if (cardA.value !== cardB.value)
    return cardA.value - cardB.value;

  return SUITS.indexOf(cardA.suit) - SUITS.indexOf(cardB.suit);
}
