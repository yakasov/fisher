let Upgrades = {
  normal: {
    fishingDelay: {
      cost: () =>
        new Decimal(5 * 1.8 ** getUpgradeAmount("fishingDelay")).mul(
          1 - 0.125 * getUpgradeAmount("cheaperUpgrades")
        ),
    },
    fishingValue: {
      cost: () =>
        new Decimal(10 * 1.75 ** getUpgradeAmount("fishingValue")).mul(
          1 - 0.125 * getUpgradeAmount("cheaperUpgrades")
        ),
    },
    fishingCapacity: {
      cost: () =>
        new Decimal(10 * 1.5 ** getUpgradeAmount("fishingCapacity")).mul(
          1 - 0.125 * getUpgradeAmount("cheaperUpgrades")
        ),
    },
    handmadeBoost: {
      cost: () =>
        new Decimal(50 * 1.5 ** getUpgradeAmount("handmadeBoost")).mul(
          1 - 0.125 * getUpgradeAmount("cheaperUpgrades")
        ),
    },
  },

  prestige: {
    cheaperUpgrades: {
      cost: () =>
        new Decimal(5 * 1.25 ** getUpgradeAmount("cheaperUpgrades")),
      max: 6,
    },
    bonusFishChance: {
      cost: () =>
        new Decimal(5 * 1.5 ** getUpgradeAmount("bonusFishChance")),
      max: 10,
    },
  },
};

const UPGRADES_CLASS = {
  normal: ["fishingDelay", "fishingValue", "fishingCapacity", "handmadeBoost"],
  prestige: ["cheaperUpgrades", "bonusFishChance"],
};

function getUpgradeClass(upgrade) {
  for (const [key, arr] of Object.entries(UPGRADES_CLASS)) {
    if (arr.includes(upgrade)) {
      return key;
    }
  }
  return "normal";
}

function getUpgradeAmount(upgrade) {
  let upgradeClass = getUpgradeClass(upgrade);
  return Player.upgrades[upgradeClass][upgrade];
}

function getUpgradeCost(upgrade) {
  let upgradeClass = getUpgradeClass(upgrade);
  return Upgrades[upgradeClass][upgrade].cost();
}

function getUpgradeMax(upgrade) {
  let upgradeClass = getUpgradeClass(upgrade);
  return Upgrades[upgradeClass][upgrade].max ?? Infinity;
}

function addUpgradeAmount(upgrade, amount) {
  let upgradeClass = getUpgradeClass(upgrade);
  Player.upgrades[upgradeClass][upgrade] =
    Player.upgrades[upgradeClass][upgrade] + amount;
}

function buyUpgrade(upgrade) {
  debugger;
  let upgradeCost = getUpgradeCost(upgrade);
  let upgradeClass = getUpgradeClass(upgrade);

  if (upgradeClass === "normal" && Player.money.gte(upgradeCost)) {
    Player.money = Player.money.sub(upgradeCost);
    addUpgradeAmount(upgrade, 1);
  } else if (upgradeClass === "prestige" && Player.prestigePoints.gte(upgradeCost)) {
    Player.prestigePoints = Player.prestigePoints.sub(upgradeCost);
    addUpgradeAmount(upgrade, 1);
  }

  Display.updateOnDemand();
}


const PERMANENTS = {
  scrapfishing: {
    bought: false,
    cost: 50,
  },
};
