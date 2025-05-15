let Permits = {
  boughtPermits: [],
  buyPermit: function (id) {
    if (this.permits[id].req()) {
      this.permits[id].buy();
      this.boughtPermits.push(id);
      this.permits[id].func();

      DisplayFunctions.elClass(`permit-${id}`, "bought", "add");
      DisplayFunctions.elOnClick(`permit-${id}`, () => {});
      DisplayFunctions.updateOnDemand();
    }
  },
  hasPermit: function (id) {
    return this.boughtPermits.includes(id);
  },
  permits: {
    0: {
      buy: () => (Player.money = Player.money.sub(250)),
      func: () => Player.allowedFish.push("lake"),
      req: () => Player.money.gte(250) && PERMANENTS.scrapfishing.bought,
    },
  },
};
