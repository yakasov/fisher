const UPGRADES = {
  fishingdelay: {
    bought: 0,
    cost: (n) => new Decimal(5 * 1.8 ** n),
  },
  fishingvalue: {
    bought: 0,
    cost: (n) => new Decimal(10 * 1.75 ** n),
  },
  fishingcapacity: {
    bought: 0,
    cost: (n) => new Decimal(10 * 1.5 ** n),
  },
  metalfisheroverclock: {
    bought: 0,
    cost: (n) => new Decimal(50 * 1.5 ** n),
  },
};

const PERMANENTS = {
  scrapfishing: {
    bought: false,
    cost: 50,
  },
};
