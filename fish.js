const RAW_FISH_DICT = {
  "anchovy": {
    "chance": 50,
    "value": 1
  },
  "carp": {
    "chance": 50,
    "value": 1
  },
  "herring": {
    "chance": 50,
    "value": 1
  },
  "sunfish": {
    "chance": 50,
    "value": 1
  },
  "sardine": {
    "chance": 40,
    "value": 1.5
  },
  "bream": {
    "chance": 30,
    "value": 2
  },
  "ghostfish": {
    "chance": 30,
    "value": 2
  },
  "chub": {
    "chance": 25,
    "value": 2.5
  },
}

const FISH_DICT = {};

// Normalize the chances into a fancy dict where all the
// values are from like 0 -> 100
const TOTAL_CHANCE = Object.values(RAW_FISH_DICT).reduce((ac, a) => ac + a.chance, 0);
const CHANCE_MULT = 100 / TOTAL_CHANCE;
let chance_acc = 0;

Object.entries(RAW_FISH_DICT).forEach(([k, v]) => {
  chance_acc += v.chance * CHANCE_MULT;
	FISH_DICT[k] = {
		chance: chance_acc,
		value: v.value
	};
})