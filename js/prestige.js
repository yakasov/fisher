let PrestigeFunctions = {
  achievedMilestones: [],
  checkMilestones: function () {},
  hasMilestone: function (id) {
    return this.achievedMilestones.includes(id);
  },
  milestones: {
    0: {
      eff: () => {},
      req: () => Player.totalPrestigePoints.gte(1),
    },
  },
  prestige: function () {
    if (this.prestigeGain() > 0) {
      Player.prestigePoints = Player.prestigePoints.add(this.prestigeGain());
      Player.totalPrestigePoints = Player.totalPrestigePoints.add(
        this.prestigeGain()
      );
      Player.reset();
      this.checkMilestones();
    }
  },
  prestigeGain: function () {
    return Math.floor(Player.fishLength() / 20 + Player.scrapLength() / 10);
  },
};
