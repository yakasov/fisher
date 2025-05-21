let FishFunctions = {
  goFish: function (auto = false, bonus = false) {
    if (
      Player.fishLength() >= Effects.fishMax() &&
      Player.scrapLength() >= Effects.scrapMax()
    ) {
      return;
    }

    let randomFish = this.getRandomFish();

    let scrapOrFish = Object.keys(SCRAP_DICT).includes(randomFish[0])
      ? Player.scrap
      : Player.fish;
    scrapOrFish[randomFish[0]] =
      !scrapOrFish[randomFish[0]] || scrapOrFish[randomFish[0]] === 0
        ? (scrapOrFish[randomFish[0]] = 1)
        : (scrapOrFish[randomFish[0]] = scrapOrFish[randomFish[0]] + 1);

    if (!bonus && Player.upgrades.prestige_bonusfishchance > 0) {
      let bonusChance = Math.random() * 100;
      if (bonusChance <= Player.upgrades.prestige_bonusfishchance * 10) {
        return this.goFish(auto, true);
      } 
    }

    if (!auto) this.fishingRecharge = Effects.fishingDelay();
    DisplayFunctions.updateOnDemand();
  },
  getRandomFish: function () {
    calculateFishChances(Player.allowedFish);

    let allowFish = Player.fishLength() < Effects.fishMax();
    let allowScrap =
      Player.scrapLength() < Effects.scrapMax() &&
      Player.allowedFish.includes("scrap");

    let scrapOrFish = Math.random();
    let filteredDict;

    if (allowScrap && (scrapOrFish <= 0.25 || !allowFish)) {
      filteredDict = Object.entries(SCRAP_DICT);
    } else if (allowFish && (scrapOrFish > 0.25 || !allowScrap)) {
      filteredDict = Object.entries(FISH_DICT).filter(([, v]) =>
        Player.allowedFish.includes(v.type)
      );
    } else {
      return;
    }

    filteredDict = filteredDict.sort(([, va], [, vb]) => va.chance - vb.chance);

    let randomChance = Math.random() * 100;
    let highestChance = filteredDict[filteredDict.length - 1][0];
    let randomFish = filteredDict.find(([, v]) => v.chance > randomChance);

    if (!randomFish) randomFish = [highestChance, filteredDict[highestChance]];
    return randomFish;
  },
  autoFish: function () {
    if (Player.craftables.metalfisher > 0 && auto.metalfisher <= currentTime) {
      this.goFish(true);
      auto.metalfisher = currentTime + Effects.autofishingInterval();
    }
  },
  getScrapOrFish: function (itemName) {
    let isScrap = Object.keys(SCRAP_DICT).includes(itemName);
    return {
      playerDict: isScrap ? Player.scrap : Player.fish,
      dataDict: isScrap ? SCRAP_DICT : FISH_DICT,
    };
  },
  sellFish: function (fishName, all = false) {
    let { playerDict, dataDict } = this.getScrapOrFish(fishName);

    if (!dataDict[fishName] || dataDict[fishName].noSell) return;
    if (all && fishName === "metal") return;

    if (playerDict[fishName] > 0) {
      playerDict[fishName] = playerDict[fishName] - 1;
      Player.money = Player.money.add(
        dataDict[fishName].value * Effects.fishingValueMult()
      );

      if (all) FishFunctions.sellFish(fishName, true);
    }

    if (!all) DisplayFunctions.updateOnDemand();
  },
  sellAll: function () {
    Object.keys(Player.fish).forEach((k) => {
      FishFunctions.sellFish(k, true);
    });

    DisplayFunctions.updateOnDemand();
  },
  fishingRecharge: 0,
};
