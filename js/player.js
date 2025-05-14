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
    fishingdelay: 0,
    fishingvalue: 0,
    fishingcapacity: 0,
    metalfisheroverclock: 0,

    prestige_cheaperupgrades: 0,
    prestige_bonusfishchance: 0,
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

    if (PrestigeFunctions.hasMilestone("0")) {
      this.craftables.metalfisher = 1;
    }
  },
};
