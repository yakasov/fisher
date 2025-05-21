let Effects = {
  fishMax: function () {
    return 20 + this.fishBucketSize();
  },
  scrapMax: function () {
    return this.fishMax() / 2;
  },
  fishBucketSize: function () {
    return getUpgradeAmount("fishingCapacity") * 10;
  },
  fishingDelay: function () {
    return 3 * 0.875 ** getUpgradeAmount("fishingDelay");
  },
  fishingValueMult: function () {
    return 1 * 1.25 ** getUpgradeAmount("fishingValue");
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
