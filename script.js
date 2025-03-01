let money = new Decimal(0);
let fish = {};
let fishLength = () => Object.values(fish).reduce((ac, a) => ac + a, 0);
let fishingRecharge = 0;
let allowedFish = ["common"];

let fishingDelay = () => 3 * 0.875 ** UPGRADES.fishingdelay.bought;
let fishingValueMult = () => 1 * 1.25 ** UPGRADES.fishingvalue.bought;

function f(n, decimals = 2) {
  if (typeof n === "string" || !n) return n;
  if (typeof n === "bigint" || typeof n === "number")
    return f(new Decimal(n), decimals);
  if (n.lt(1e3)) return n.toFixed(decimals);

  const ns = n.toString();

  function getLength(nn) {
    return nn.toString().split(".")[0].length;
  }

  if (n.lt(1e6)) {
    const half1 = ns.slice(0, getLength(ns) - 3);
    const half2 = ns.slice(getLength(ns) - 3, getLength(ns));
    return `${half1},${half2}`;
  } else if (n.lt(1e9)) {
    const half1 = ns.slice(0, getLength(ns) - 6);
    const half2 = ns.slice(getLength(ns) - 6, getLength(ns) - 3);
    const half3 = ns.slice(getLength(ns) - 3, getLength(ns));
    return `${half1},${half2},${half3}`;
  }
  return `${ns[0]}.${ns[1]}${ns[2]}e${getLength(n) - 1}`;
}

function goFish() {
  const randomFish = getRandomFish();
  fish[randomFish[0]] =
    !fish[randomFish[0]] || fish[randomFish[0]] === 0
      ? (fish[randomFish[0]] = 1)
      : (fish[randomFish[0]] = fish[randomFish[0]] + 1);

  fishingRecharge = fishingDelay();
  updateOnDemand();
}

function getRandomFish() {
  calculateFishChances(allowedFish);

  const randomChance = Math.random() * 100;
  const highestChance = Object.entries(FISH_DICT).sort(
    ([, va], [, vb]) => vb.chance - va.chance
  )[0][0];
  let randomFish = Object.entries(FISH_DICT).find(
    ([, v]) => v.chance > randomChance
  );

  if (!randomFish) randomFish = [highestChance, FISH_DICT[highestChance]];
  return randomFish;
}

function getFishDisplay() {
  let text = "";

  Object.entries(fish).forEach(([fishName, fishAmount]) => {
    const upperFishName =
      FISH_DICT[fishName].name ??
      fishName.charAt(0).toUpperCase() + fishName.slice(1);
    text += `<div class="fish-line"><span class="left"><img src="images/${fishName}.png" height="12" width="12" class="mini-right">${upperFishName}: ${fishAmount}</span><span class="right"><button onclick="sellFish('${fishName}')" ${
      fishAmount === 0 || FISH_DICT[fishName].noSell ? 'disabled=""' : ""
    }>${
      FISH_DICT[fishName].noSell
        ? "Cannot sell"
        : "Sell for " + f(FISH_DICT[fishName].value * fishingValueMult()) + "$"
    }</button></span></div><br>`;
  });

  return text;
}

function sellFish(fishName, all = false) {
  if (fish[fishName] > 0 && !fish[fishName].noSell) {
    fish[fishName] = fish[fishName] - 1;
    money = money.add(FISH_DICT[fishName].value * fishingValueMult());

    if (all) sellFish(fishName, true);
  }

  updateOnDemand();
}

function sellAll() {
  Object.keys(fish).forEach((k) => {
    sellFish(k, true);
  });
}

function buyUpgrade(upgrade) {
  const u = UPGRADES[upgrade];
  if (money.gte(u.cost(u.bought))) {
    money = money.sub(u.cost(u.bought));
    u.bought = u.bought + 1;
  }

  updateOnDemand();
}

function buyPermanent(upgrade) {
  const u = PERMANENTS[upgrade];
  if (money.gte(u.cost) && !u.bought) {
    money = money.sub(u.cost);
    u.bought = true;
  }

  switch (upgrade) {
    case "scrapfishing":
      allowedFish.push("scrap");
      break;
    default:
      break;
  }

  updateOnDemand();
}

function updateDisplays() {
  document.getElementById("money-display").innerText = `You have ${f(money)}$.`;
  document.getElementById(
    "fish-count-display"
  ).innerText = `You have ${fishLength()} fish.`;
  document.getElementById("fish-delay").innerText = `Fishing recharge: ${f(
    fishingRecharge
  )}s\nMax recharge: ${f(fishingDelay())}s`;
}

function updateOnDemand() {
  let el;

  document.getElementById("fish-amounts").innerHTML = getFishDisplay();
  document.getElementById("sellall-button").disabled = fishLength() === 0;

  document.getElementById("fishingdelay-upgrade").innerText = `Buy for ${f(
    UPGRADES.fishingdelay.cost(UPGRADES.fishingdelay.bought)
  )}$`;
  document.getElementById("fishingvalue-upgrade").innerText = `Buy for ${f(
    UPGRADES.fishingvalue.cost(UPGRADES.fishingvalue.bought)
  )}$`;

  document.getElementById("fishingdelay-mult").innerText = `( ${f(
    fishingDelay() / 3
  )}x )`;
  document.getElementById("fishingvalue-mult").innerText = `( ${f(
    fishingValueMult()
  )}x )`;

  if (PERMANENTS.scrapfishing.bought) {
    el = document.getElementById("scrapfishing-upgrade");
    el.disabled = true;
    el.innerText = "Bought!";

    document.getElementById("crafting-scraprecipes").classList.remove("hidden");
  }
}

function updateFishingRecharge() {
  const goFishButton = document.getElementById("gofish-button");
  if (fishingRecharge === 0) {
    goFishButton.disabled = false;
  } else if (!goFishButton.disabled) {
    goFishButton.disabled = true;
  }

  // Improve this hack for slight maths inaccuracy
  if (fishingRecharge > 0) fishingRecharge -= 0.025;
  if (fishingRecharge < 0) fishingRecharge = 0;
}

function gameLoop() {
  updateDisplays();
  updateFishingRecharge();

  // in case anybody wants to cheat but they don't realise it needs to be a Decimal
  if (typeof money === "number") money = new Decimal(money);
}

loadGame();
calculateFishChances(allowedFish);
setInterval(gameLoop, 25);
setInterval(saveGame, 5000);
updateOnDemand();
