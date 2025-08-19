let Effects = {
  fishMax: function () {
    return 20 + this.fishBucketSize();
  },
  scrapMax: function () {
    return Math.floor(this.fishMax() / 2);
  },
  fishBucketSize: function () {
    return Math.floor(
      getUpgradeAmount("fishingCapacity") *
        10 *
        (Prestige.getMilestoneEffect(1) ?? 1)
    );
  },
  fishingDelay: function () {
    return 3 * 0.875 ** getUpgradeAmount("fishingDelay");
  },
  fishingValueMult: function () {
    return (
      1 *
      (1 + (Prestige.getMilestoneEffect(1) ?? 4) / 4) *
      1.25 ** getUpgradeAmount("fishingValue")
    );
  },
  autofishingInterval: function () {
    return (
      (this.fishingDelay() * 10) /
      (Player.craftables.metalfisher * this.metalfisherOverclock())
    );
  },
  metalfisherOverclock: function () {
    return 1 + 0.125 * getUpgradeAmount("handmadeBoost");
  },
};
