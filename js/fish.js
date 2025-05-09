let FishFunctions = {
  goFish: function (auto = false) {
    if (
      this.fishLength() >= Effects.fishMax() &&
      this.scrapLength() >= Effects.scrapMax()
    ) {
      return;
    }

    const randomFish = this.getRandomFish(
      this.fishLength() < Effects.fishMax(),
      this.scrapLength() < Effects.scrapMax() && allowedFish.includes("scrap")
    );
    fish[randomFish[0]] =
      !fish[randomFish[0]] || fish[randomFish[0]] === 0
        ? (fish[randomFish[0]] = 1)
        : (fish[randomFish[0]] = fish[randomFish[0]] + 1);

    if (!auto) this.fishingRecharge = Effects.fishingDelay();
    DisplayFunctions.updateOnDemand();
  },
  getRandomFish: function (allowFish, allowScrap) {
    calculateFishChances(allowedFish);

    let scrapOrFish = Math.random();
    let filteredDict;

    if (allowScrap && (scrapOrFish < 0.33 || !allowFish)) {
      filteredDict = Object.entries(SCRAP_DICT);
    } else if (allowFish && (scrapOrFish > 0.33 || !allowScrap)) {
      filteredDict = Object.entries(FISH_DICT).filter(([, v]) =>
        allowedFish.includes(v.type)
      );
    } else {
      return;
    }

    filteredDict = filteredDict.sort(([, va], [, vb]) => va.chance - vb.chance);

    const randomChance = Math.random() * 100;
    const highestChance = filteredDict[filteredDict.length - 1][0];
    let randomFish = filteredDict.find(([, v]) => v.chance > randomChance);

    if (!randomFish) randomFish = [highestChance, filteredDict[highestChance]];
    return randomFish;
  },
  autoFish: function () {
    if (craftables.metalfisher > 0 && auto.metalfisher <= currentTime) {
      this.goFish(true);
      auto.metalfisher = currentTime + Effects.autofishingInterval();
    }
  },
  sellFish: function (fishName, all = false) {
    if (!FISH_DICT[fishName] || FISH_DICT[fishName].noSell) return;
    if (all && fishName === "metal") return;

    if (fish[fishName] > 0) {
      fish[fishName] = fish[fishName] - 1;
      money = money.add(FISH_DICT[fishName].value * Effects.fishingValueMult());

      if (all) FishFunctions.sellFish(fishName, true);
    }

    if (!all) DisplayFunctions.updateOnDemand();
  },
  sellAll: function () {
    Object.keys(fish).forEach((k) => {
      FishFunctions.sellFish(k, true);
    });

    DisplayFunctions.updateOnDemand();
  },
  fishLength: function () {
    return Object.entries(fish)
      .filter(([k]) => FISH_DICT[k])
      .reduce((ac, [, a]) => ac + a, 0);
  },
  scrapLength: function () {
    return Object.entries(fish)
      .filter(([k]) => SCRAP_DICT[k])
      .reduce((ac, [, a]) => ac + a, 0);
  },
  fishingRecharge: 0,
};
