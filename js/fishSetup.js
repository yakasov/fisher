const FISH_VALUES = {
  // Normal fish
  anchovy: { chance: 50, type: "normal", value: 1 },
  carp: { chance: 50, type: "normal", value: 1 },
  herring: { chance: 50, type: "normal", value: 1 },
  sunfish: { chance: 50, type: "normal", value: 1 },
  sardine: { chance: 40, type: "normal", value: 1.5 },
  bream: { chance: 30, type: "normal", value: 2 },
  ghostfish: { chance: 30, type: "normal", value: 2 },
  chub: { chance: 20, type: "normal", value: 2.5 },
  red_snapper: { chance: 20, name: "Red Snapper", type: "normal", value: 2.5 },
  smallmouth_bass: {
    chance: 20,
    name: "Smallmouth Bass",
    type: "normal",
    value: 2.5,
  },

  // Lake fish
  perch: { chance: 40, type: "lake", value: 4 },
  shad: { chance: 35, type: "lake", value: 5 },
  rainbow_trout: { chance: 30, name: "Rainbow Trout", type: "lake", value: 6 },
  albacore: { chance: 25, type: "lake", value: 6.5 },
  bullhead: { chance: 20, type: "lake", value: 7 },
  red_mullet: { chance: 15, name: "Red Mullet", type: "lake", value: 7.5 },
};
const SCRAP_VALUES = {
  // Scrap
  scrap: { chance: 66, noSell: true, type: "scrap", value: 0 },
  rust: {
    chance: 34,
    name: "Rusted Metal",
    noSell: true,
    type: "scrap",
    value: 0,
  },
  metal: { chance: 15, name: "Metal Parts", type: "scrap", value: 5 },
};

const FISH_CHANCES = { normal: 66, lake: 34 };
const FISH_DICT = {};
const SCRAP_DICT = {};

function calculateFishChances(allowedFish) {
  // Multiply FISH_CHANCES by this to get the chance normalised to 100
  let totalTypeChance =
    100 / allowedFish.reduce((ac, k) => ac + (FISH_CHANCES[k] || 0), 0);

  // Multiply each fish chance by their fish type chance to get the chance normalised to 100
  let fishTypeChances = {};
  allowedFish.forEach((type) => {
    let totalFishChance = Object.values(FISH_VALUES)
      .filter((fish) => fish.type === type)
      .reduce((sum, fish) => sum + fish.chance, 0);
    fishTypeChances[type] =
      totalFishChance > 0
        ? (FISH_CHANCES[type] * totalTypeChance) / totalFishChance
        : 0;
  });

  // Scrap only has one type so we only need scrapMult instead of a dict
  let scrapMult =
    100 / Object.values(SCRAP_VALUES).reduce((ac, k) => ac + k.chance, 0);

  let chanceAcc = 0;
  Object.entries(FISH_VALUES).forEach(([fishName, fishData]) => {
    let normalisedChance = fishData.chance * fishTypeChances[fishData.type];
    FISH_DICT[fishName] = {
      chance: allowedFish.includes(fishData.type) ? chanceAcc : 0,
      name: fishData.name ?? null,
      noSell: fishData.noSell ?? null,
      type: fishData.type,
      value: fishData.value,
    };
    chanceAcc += allowedFish.includes(fishData.type) ? normalisedChance : 0;
  });

  // Normalise fish chances to max at 100
  Object.keys(FISH_DICT).forEach((fishName) => {
    if (FISH_DICT[fishName].chance > 0) {
      FISH_DICT[fishName].chance =
        (FISH_DICT[fishName].chance / chanceAcc) * 100;
    }
  });

  chanceAcc = 0;
  Object.entries(SCRAP_VALUES).forEach(([scrapName, scrapData]) => {
    let normalisedChance = scrapData.chance * scrapMult;
    SCRAP_DICT[scrapName] = {
      chance: chanceAcc,
      name: scrapData.name ?? null,
      noSell: scrapData.noSell ?? null,
      type: scrapData.type,
      value: scrapData.value,
    };
    chanceAcc += normalisedChance;
  });

  // Normalise scrap chances to max at 100
  Object.keys(SCRAP_DICT).forEach((scrapName) => {
    if (SCRAP_DICT[scrapName].chance > 0) {
      SCRAP_DICT[scrapName].chance =
        (SCRAP_DICT[scrapName].chance / chanceAcc) * 100;
    }
  });
}
