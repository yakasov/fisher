const UPGRADES = {
  fishingdelay: () =>
    new Decimal(5 * 1.8 ** Player.upgrades.fishingdelay).mul(
      1 - 0.125 * Player.upgrades.prestige_cheaperupgrades
    ),
  fishingvalue: () =>
    new Decimal(10 * 1.75 ** Player.upgrades.fishingvalue).mul(
      1 - 0.125 * Player.upgrades.prestige_cheaperupgrades
    ),
  fishingcapacity: () =>
    new Decimal(10 * 1.5 ** Player.upgrades.fishingcapacity).mul(
      1 - 0.125 * Player.upgrades.prestige_cheaperupgrades
    ),
  metalfisheroverclock: () =>
    new Decimal(50 * 1.5 ** Player.upgrades.metalfisheroverclock).mul(
      1 - 0.125 * Player.upgrades.prestige_cheaperupgrades
    ),

  prestige_cheaperupgrades: () =>
    new Decimal(5 * 1.25 ** Player.upgrades.prestige_cheaperupgrades),
  prestige_bonusfishchance: () =>
    new Decimal(5 * 1.5 ** Player.upgrades.prestige_bonusfishchance),
};

const UPGRADES_CLASS = {
  normal: [
    "fishingdelay",
    "fishingvalue",
    "fishingcapacity",
    "metalfisheroverclock",
  ],
  prestige: ["prestige_cheaperupgrades", "prestige_bonusfishchance"],
};

function getUpgradeClass(upgrade) {
  for (const [key, arr] of Object.entries(UPGRADES_CLASS)) {
    if (arr.includes(upgrade)) {
      return key;
    }
  }
  return "normal";
}

const PERMANENTS = {
  scrapfishing: {
    bought: false,
    cost: 50,
  },
};
