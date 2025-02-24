let money = new Decimal(0);
let fish = {};
let fishLength = () => Object.values(fish).reduce((ac, a) => ac + a, 0);
let fishingRecharge = 0;

let fishingDelay = () => 3 * 0.875 ** UPGRADES.fishingdelay.bought;

function f(n, decimals = 2) {
  if (typeof n === "string" || !n) return n;
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
  const randomChance = Math.random() * 100;
  const randomFish = Object.entries(FISH_DICT).find(
    ([, v]) => v.chance > randomChance
  );
  return randomFish;
}

function getFishDisplay() {
  let text = "";

  Object.entries(fish).forEach(([fishName, fishAmount]) => {
    const upperFishName = fishName.charAt(0).toUpperCase() + fishName.slice(1);
    text += `<div class="fish-line"><span class="left"><img src="images/${upperFishName}.png" height="12" width="12" class="mini-right">${upperFishName}: ${fishAmount}</span><span class="right"><button onclick="sellFish('${fishName}')" ${
      fishAmount === 0 ? 'disabled=""' : ""
    }>Sell for ${FISH_DICT[fishName].value}$</button></span></div><br>`;
  });

  return text;
}

function sellFish(fishName, all = false) {
  if (fish[fishName] > 0) {
    fish[fishName] = fish[fishName] - 1;
    money = money.add(FISH_DICT[fishName].value);

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

function updateDisplays() {
  document.getElementById("money-display").innerText = `You have ${f(money)}$.`;
  document.getElementById(
    "fish-count-display"
  ).innerText = `You have ${fishLength()} fish.`;
  document.getElementById("fish-delay").innerText = `Fishing recharge: ${f(
    new Decimal(fishingRecharge),
    2
  )}s\nMax recharge: ${f(new Decimal(fishingDelay()), 2)}s`;
}

function updateOnDemand() {
  document.getElementById("fish-amounts").innerHTML = getFishDisplay();
  document.getElementById("sellall-button").disabled = fishLength() === 0;
  document.getElementById("fishingdelay-upgrade").innerText = `Buy for ${f(
    UPGRADES.fishingdelay.cost(UPGRADES.fishingdelay.bought)
  )}$`;
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
}

setInterval(gameLoop, 25);
updateOnDemand();
