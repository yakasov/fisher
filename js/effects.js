let Effects = {
  fishMax: function () {
    return 20 + this.fishBucketSize();
  },
  scrapMax: function () {
    return this.fishMax() / 2;
  },
  fishBucketSize: function () {
    return UPGRADES.fishingcapacity.bought * 10;
  },
  fishingDelay: function () {
    return 3 * 0.875 ** UPGRADES.fishingdelay.bought;
  },
  fishingValueMult: function () {
    return 1 * 1.25 ** UPGRADES.fishingvalue.bought;
  },
  autofishingInterval: function () {
    return (
      (this.fishingDelay() * 10) /
      (craftables.metalfisher * this.metalfisherOverclock())
    );
  },
  metalfisherOverclock: function () {
    return 1 + 0.125 * UPGRADES.metalfisheroverclock.bought;
  },
};
