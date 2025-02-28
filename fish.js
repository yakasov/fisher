const RAW_FISH_DICT = {
  anchovy: {
    chance: 50,
    type: "common",
    value: 1,
  },
  carp: {
    chance: 50,
    type: "common",
    value: 1,
  },
  herring: {
    chance: 50,
    type: "common",
    value: 1,
  },
  sunfish: {
    chance: 50,
    type: "common",
    value: 1,
  },
  sardine: {
    chance: 40,
    type: "common",
    value: 1.5,
  },
  bream: {
    chance: 30,
    type: "common",
    value: 2,
  },
  ghostfish: {
    chance: 30,
    type: "common",
    value: 2,
  },
  chub: {
    chance: 25,
    type: "common",
    value: 2.5,
  },
  junk: {
    chance: 66,
    type: "scrap",
    value: 0.01,
  },
  rust: {
    chance: 34,
    name: "Rusted Metal",
    type: "scrap",
    value: 0.05,
  },
};
const FISH_TYPES = {
  common: 66,
  scrap: 34,
};

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

  const TOTAL_CHANCE = Object.values(RAW_FISH_DICT)
    .filter((v) => allowedFish.includes(v.type))
    .reduce((ac, a) => ac + a.chance, 0);
  const CHANCE_MULT = 100 / TOTAL_CHANCE;
  let chance_acc = 0;

  Object.entries(RAW_FISH_DICT).forEach(([k, v]) => {
    chance_acc +=
      v.chance * CHANCE_MULT * ((FISH_TYPES[v.type] / 100) * TYPE_MULT);
    FISH_DICT[k] = {
      chance: chance_acc,
      type: v.type,
      value: v.value,
    };

    if (RAW_FISH_DICT[k].name) FISH_DICT[k].name = RAW_FISH_DICT[k].name;
  });
}
