let Prestige = {
  achievedMilestones: [],
  checkMilestones: function () {
    Object.keys(this.milestones).forEach((key) => {
      if (this.milestones[key].req()) {
        this.achievedMilestones.push(key);
        this.milestones[key].eff();

        Display.elDisabled(`prestige-milestone-${key}`, false);
        Display.elClass(`prestige-milestone-${key}`, "bought", "add");
      }
    });
  },
  getMilestoneEffect: function (id) {
    // Need to null check for a non-achieved milestone when using this func
    if (this.hasMilestone(id)) return this.milestones[id].eff();
    return null;
  },
  hasMilestone: function (id) {
    return this.achievedMilestones.includes(id.toString());
  },
  milestones: {
    0: {
      eff: () => {},
      req: () => Player.totalPrestigePoints.gte(1),
    },
    1: {
      eff: () => 1 + Math.log(Player.totalPrestigePoints),
      req: () => Player.totalPrestigePoints.gte(10),
    },
    2: {
      eff: () => 5,
      req: () => Player.stats.prestigeCount >= 10,
    },
  },
  prestige: function () {
    if (this.prestigeGain() > 0) {
      Player.prestigePoints = Player.prestigePoints.add(this.prestigeGain());
      Player.totalPrestigePoints = Player.totalPrestigePoints.add(
        this.prestigeGain()
      );
      Player.stats.prestigeCount++;
      this.checkMilestones();
      Player.reset();
    }
  },
  prestigeGain: function () {
    return Math.floor(
      Math.floor(Player.fishLength() / 20 + Player.scrapLength() / 10) *
        (this.getMilestoneEffect(2) ?? 1) *
        1.2 ** Upgrades.getUpgradeAmount("prestigePointsMultiplier")
    );
  },
};
