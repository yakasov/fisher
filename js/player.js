let Player = {
  prestigePoints: new Decimal(0),
  totalPrestigePoints: new Decimal(0),
  allowedFish: ["normal"],
  craftables: {
    metalfisher: 0,
  },
  fish: {},
  scrap: {},
  money: new Decimal(0),
  upgrades: {
    normal: {
      fishingDelay: 0,
      fishingValue: 0,
      fishingCapacity: 0,
      handmadeBoost: 0,
    },

    prestige: {
      cheaperUpgrades: 0,
      bonusFishChance: 0,
    },
  },
  fishLength: function () {
    return Object.values(this.fish).reduce((a, b) => a + b, 0);
  },
  scrapLength: function () {
    return Object.values(this.scrap).reduce((a, b) => a + b, 0);
  },
  reset: function () {
    this.fish = {};
    this.scrap = {};
    this.money = new Decimal(0);
    Object.keys(this.upgrades).forEach((key) => {
      if (getUpgradeClass(key) === "normal") {
        this.upgrades[key] = 0;
      }
    });
    Object.keys(this.craftables).forEach((key) => {
      this.craftables[key] = 0;
    });

    if (Prestige.hasMilestone("0")) {
      this.craftables.metalfisher = 1;
    }
  },
};
