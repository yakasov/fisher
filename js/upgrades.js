const UPGRADES = {
  fishingdelay: () => new Decimal(5 * 1.8 ** Player.upgrades.fishingdelay),
  fishingvalue: () => new Decimal(10 * 1.75 ** Player.upgrades.fishingvalue),
  fishingcapacity: () => new Decimal(10 * 1.5 ** Player.upgrades.fishingcapacity),
  metalfisheroverclock: () => new Decimal(50 * 1.5 ** Player.upgrades.metalfisheroverclock),
};

const PERMANENTS = {
  scrapfishing: {
    bought: false,
    cost: 50,
  },
};
