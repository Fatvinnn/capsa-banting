function aiChooseMove(hand, currentCombo) {
  const allMoves = getAllValidCombos(hand);
  const beatingMoves = allMoves.filter(move => !currentCombo || canBeat(move, currentCombo));

  if (beatingMoves.length === 0) return null;

  beatingMoves.sort((a, b) => getHighestCard(a).value - getHighestCard(b).value);
  return beatingMoves[0];
}

function getAllValidCombos(hand) {
  const combos = [];

  // Single
  for (let card of hand) combos.push([card]);

  // Pair
  for (let i = 0; i < hand.length - 1; i++) {
    for (let j = i + 1; j < hand.length; j++) {
      if (hand[i].value === hand[j].value)
        combos.push([hand[i], hand[j]]);
    }
  }

  // Triple
  for (let i = 0; i < hand.length - 2; i++) {
    for (let j = i + 1; j < hand.length - 1; j++) {
      for (let k = j + 1; k < hand.length; k++) {
        if (hand[i].value === hand[j].value && hand[j].value === hand[k].value)
          combos.push([hand[i], hand[j], hand[k]]);
      }
    }
  }

  return combos;
}
