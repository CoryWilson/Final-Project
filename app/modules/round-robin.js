//variation of the robin npm module
exports.pairUsers = function(playerNum, playerArray) {
  var roundsArray = [];
  if (!playerArray) {
    playerArray = [];
    for (var k = 1; k <= playerNum; k += 1) {
      playerArray.push(k);
    }
  } else {
    playerArray = playerArray.slice();
  }

  if (playerNum  % 2 === 1) {
    playerArray.push(DUMMY); // so we can match algorithm for even numbers
    playerNum  += 1;
  }
  for (var j = 0; j < playerNum  - 1; j += 1) {
    roundsArray[j] = [];
    for (var i = 0; i < playerNum  / 2; i += 1) {
      if (playerArray[i] !== DUMMY && playerArray[playerNum  - 1 - i] !== DUMMY) {
        roundsArray[j].push(
          {'competitors':[playerArray[i], playerArray[playerNum  - 1 - i]]}
        );
      }
    }
    playerArray.splice(1, 0, playerArray.pop());
  }
  return roundsArray;
};
