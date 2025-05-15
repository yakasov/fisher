let PrestigeFunctions = {
  achievedMilestones: [],
  checkMilestones: function () {
    Object.keys(this.milestones).forEach((key) => {
      if (this.milestones[key].req()) {
        this.achievedMilestones.push(key);
        this.milestones[key].eff();

        DisplayFunctions.elDisabled(`prestige-milestone-${key}`, false);
        DisplayFunctions.elClass(`prestige-milestone-${key}`, "bought", "add");
      }
    });
  },
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
      this.checkMilestones();
      Player.reset();
    }
  },
  prestigeGain: function () {
    return Math.floor(Player.fishLength() / 20 + Player.scrapLength() / 10);
  },
};
