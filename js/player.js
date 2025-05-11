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
  },
  fishLength: function () {
    return Object.values(this.fish).reduce((a, b) => a + b, 0);
  },
  scrapLength: function () {
    return Object.values(this.scrap).reduce((a, b) => a + b, 0);
  },
  reset: function () {
    this.prestigePoints = new Decimal(0);
    this.totalPrestigePoints = new Decimal(0);
    this.fish = {};
    this.scrap = {};
    this.money = new Decimal(0);
  },
};
