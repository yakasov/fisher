let currentTime = 0;

let auto = {
  metalfisher: 0,
};

function updateFishingRecharge() {
  const goFishButton = document.getElementById("gofish-button");
  if (Fish.fishingRecharge === 0) {
    goFishButton.disabled = false;
  } else if (!goFishButton.disabled) {
    goFishButton.disabled = true;
  }

  // Improve this hack for slight maths inaccuracy
  if (Fish.fishingRecharge > 0) Fish.fishingRecharge -= 0.025;
  if (Fish.fishingRecharge < 0) Fish.fishingRecharge = 0;
}

function gameLoop(isNormalLoop = true) {
  if (isNormalLoop) {
    currentTime += 0.025;
    Player.stats.timePlayed += 0.025;
    Display.updateDisplays();
  }
  
  updateFishingRecharge();
  Fish.autoFish();

  // in case anybody wants to cheat but they don't realise it needs to be a Decimal
  if (typeof Player.money === "number")
    Player.money = new Decimal(Player.money);
}

loadGame();
calculateFishChances();
setInterval(gameLoop, 25);
setInterval(saveGame, 5000);
Display.updateOnDemand();
