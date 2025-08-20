let Upgrades = {
  upgrades: {
    normal: {
      fishingDelay: {
        cost: () => new Decimal(5 * 1.8 ** Upgrades.getUpgradeAmount("fishingDelay")).mul(
            1 - 0.125 * Upgrades.getUpgradeAmount("cheaperUpgrades")
          )
        
      },
      fishingValue: {
        cost: () =>
          new Decimal(10 * 1.75 ** Upgrades.getUpgradeAmount("fishingValue")).mul(
            1 - 0.125 * Upgrades.getUpgradeAmount("cheaperUpgrades")
          ),
      },
      fishingCapacity: {
        cost: () =>
          new Decimal(10 * 1.5 ** Upgrades.getUpgradeAmount("fishingCapacity")).mul(
            1 - 0.125 * Upgrades.getUpgradeAmount("cheaperUpgrades")
          ),
      },
      handmadeBoost: {
        cost: () =>
          new Decimal(50 * 1.5 ** Upgrades.getUpgradeAmount("handmadeBoost")).mul(
            1 - 0.125 * Upgrades.getUpgradeAmount("cheaperUpgrades")
          ),
      },
    },

    prestige: {
      cheaperUpgrades: {
        cost: () =>
          new Decimal(5 * 1.25 ** Upgrades.getUpgradeAmount("cheaperUpgrades")),
        max: 6,
      },
      bonusFishChance: {
        cost: () =>
          new Decimal(5 * 1.5 ** Upgrades.getUpgradeAmount("bonusFishChance")),
        max: 10,
      },
      prestigePointsMultiplier: {
        classOverride: "normal",
        cost: () =>
          new Decimal(
            1000 * 2 ** Upgrades.getUpgradeAmount("prestigePointsMultiplier")
          ),
      },
    },
  },
  getUpgradeClass: function (upgrade) {
    for (const [key, upgs] of Object.entries(Upgrades.upgrades)) {
      let arr = Object.keys(upgs);

      if (arr.includes(upgrade)) {
        return key;
      }
    }

    return "normal";
  },
  getUpgradeAmount: function (upgrade) {
    let upgradeClass = this.getUpgradeClass(upgrade);
    return Player.upgrades[upgradeClass][upgrade] ?? 0;
  },
  addUpgradeAmount: function (upgrade, amount) {
    let upgradeClass = this.getUpgradeClass(upgrade);
    Player.upgrades[upgradeClass][upgrade] =
      Player.upgrades[upgradeClass][upgrade] + amount;
  },
  getUpgradeCost: function (upgrade) {
    let upgradeClass = this.getUpgradeClass(upgrade);
    return this.upgrades[upgradeClass][upgrade].cost();
  },
  getUpgradeMax: function (upgrade) {
    let upgradeClass = this.getUpgradeClass(upgrade);
    return this.upgrades[upgradeClass][upgrade].max ?? Infinity;
  },
  buyUpgrade: function (upgrade) {
    let upgradeCost = this.getUpgradeCost(upgrade);
    let upgradeClass = upgrade.classOverride ?? this.getUpgradeClass(upgrade);

    if (upgradeClass === "normal" && Player.money.gte(upgradeCost)) {
      Player.money = Player.money.sub(upgradeCost);
      this.addUpgradeAmount(upgrade, 1);
    } else if (
      upgradeClass === "prestige" &&
      Player.prestigePoints.gte(upgradeCost)
    ) {
      Player.prestigePoints = Player.prestigePoints.sub(upgradeCost);
      this.addUpgradeAmount(upgrade, 1);
    }

    Display.updateOnDemand();
  },
  permanents: {
    scrapfishing: {
      bought: false,
      cost: 50,
    },
  },
  buyPermanent: function (upgrade) {
    const u = this.permanents[upgrade];
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

    Display.updateOnDemand();
  },
};
