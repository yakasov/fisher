let FishFunctions = {
  goFish: function (auto = false) {
    // if (this.fishLength() >= Effects.fishMax()) return;

    const randomFish = this.getRandomFish(
      this.fishLength() >= Effects.fishMax() ? "scrap" : null
    );
    fish[randomFish[0]] =
      !fish[randomFish[0]] || fish[randomFish[0]] === 0
        ? (fish[randomFish[0]] = 1)
        : (fish[randomFish[0]] = fish[randomFish[0]] + 1);

    if (!auto) this.fishingRecharge = Effects.fishingDelay();
    DisplayFunctions.updateOnDemand();
  },
  getRandomFish: function (specificType = null) {
    calculateFishChances(allowedFish);

    const randomChance = Math.random() * 100;
    const filteredDict = Object.entries(FISH_DICT)
      .filter(([, v]) =>
        specificType ? v.type === specificType : allowedFish.includes(v.type)
      )
      .sort(([, va], [, vb]) => va.chance - vb.chance);
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
    if (FISH_DICT[fishName].noSell) return;
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
      .filter(([k]) => FISH_DICT[k].type !== "scrap")
      .reduce((ac, [, a]) => ac + a, 0);
  },
  fishingRecharge: 0,
};
