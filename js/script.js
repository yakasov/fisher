let currentTime = 0;

let auto = {
  metalfisher: 0,
};

function buyUpgrade(upgrade) {
  const u = UPGRADES[upgrade]();
  if (Player.money.gte(u)) {
    Player.money = Player.money.sub(u);
    Player.upgrades[upgrade] = Player.upgrades[upgrade] + 1;
  }

  DisplayFunctions.updateOnDemand();
}

function buyPermanent(upgrade) {
  const u = PERMANENTS[upgrade];
  if (Player.money.gte(u) && !u.bought) {
    Player.money = Player.money.sub(u.cost);
    u.bought = true;

    switch (upgrade) {
      case "scrapfishing":
        Player.allowedFish.push("scrap");
        break;
      default:
        break;
    }
  }
  
  DisplayFunctions.updateOnDemand();
}

function updateFishingRecharge() {
  const goFishButton = document.getElementById("gofish-button");
  if (FishFunctions.fishingRecharge === 0) {
    goFishButton.disabled = false;
  } else if (!goFishButton.disabled) {
    goFishButton.disabled = true;
  }

  // Improve this hack for slight maths inaccuracy
  if (FishFunctions.fishingRecharge > 0) FishFunctions.fishingRecharge -= 0.025;
  if (FishFunctions.fishingRecharge < 0) FishFunctions.fishingRecharge = 0;
}

function gameLoop() {
  currentTime += 0.025;
  DisplayFunctions.updateDisplays();
  updateFishingRecharge();
  FishFunctions.autoFish();

  // in case anybody wants to cheat but they don't realise it needs to be a Decimal
  if (typeof Player.money === "number") Player.money = new Decimal(Player.money);
}

loadGame();
calculateFishChances();
setInterval(gameLoop, 25);
setInterval(saveGame, 5000);
DisplayFunctions.updateOnDemand();
