const RAW_FISH_DICT = {
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
  smallmouth_bass: {chance: 20, name: "Smallmouth Bass", type: "normal", value: 2.5 },

  // Lake fish
  perch: { chance: 40, type: "lake", value: 4 },
  shad: { chance: 35, type: "lake", value: 5 },
  rainbow_trout: { chance: 30, name: "Rainbow Trout", type: "lake", value: 6 },
  albacore: { chance: 25, type: "lake", value: 6.5 },
  bullhead: { chance: 20, type: "lake", value: 7 },
  red_mullet: { chance: 15, name: "Red Mullet", type: "lake", value: 7.5 },

  // Scrap
  scrap: { chance: 66, noSell: true, type: "scrap", value: 0 },
  rust: { chance: 34, name: "Rusted Metal", noSell: true, type: "scrap", value: 0 },
  metal: { chance: 15, name: "Metal Parts", type: "scrap", value: 5 },
};

const FISH_TYPES = {
  normal: 66,
  scrap: 34,
  lake: 34
};
const CHANCE_MULTS = {};

let FISH_DICT = {};
let ALLOWED_FISH_CACHE = "";

function calculateFishChances(allowedFish) {
  if (allowedFish.join() === ALLOWED_FISH_CACHE) return FISH_DICT;
  ALLOWED_FISH_CACHE = allowedFish.join();
  FISH_DICT = {};

  // Normalize the chances into a fancy dict where all the
  // values are from like 0 -> 100
  const TYPE_CHANCE = Object.entries(FISH_TYPES)
    .filter(([k]) => allowedFish.includes(k))
    .reduce((ac, [, v]) => ac + v, 0);
  const TYPE_MULT = 100 / TYPE_CHANCE;

  allowedFish.forEach((type) => {
    const mult = Object.values(RAW_FISH_DICT)
      .filter((v) => type === v.type)
      .reduce((ac, a) => ac + a.chance, 0);
    CHANCE_MULTS[type] = 100 / mult;
  });
  let chance_acc = 0;

  Object.entries(RAW_FISH_DICT).forEach(([k, v]) => {
    FISH_DICT[k] = {
      chance: chance_acc,
      name: RAW_FISH_DICT[k].name ?? null,
      noSell: RAW_FISH_DICT[k].noSell ?? null,
      type: v.type,
      value: v.value,
    };
    chance_acc +=
      v.chance * CHANCE_MULTS[v.type] * (FISH_TYPES[v.type] / 100) * TYPE_MULT;
  });
}
