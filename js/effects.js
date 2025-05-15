let Effects = {
  fishMax: function () {
    return 20 + this.fishBucketSize();
  },
  scrapMax: function () {
    return this.fishMax() / 2;
  },
  fishBucketSize: function () {
    return Player.upgrades.fishingcapacity * 10;
  },
  fishingDelay: function () {
    return 3 * 0.875 ** Player.upgrades.fishingdelay;
  },
  fishingValueMult: function () {
    return 1 * 1.25 ** Player.upgrades.fishingvalue;
  },
  autofishingInterval: function () {
    return (
      (this.fishingDelay() * 10) /
      (Player.craftables.metalfisher * this.metalfisherOverclock())
    );
  },
  metalfisherOverclock: function () {
    return 1 + 0.125 * Player.upgrades.metalfisheroverclock;
  },
};
