let Permits = {
  boughtPermits: [],
  buyPermit: function (id) {
    if (this.permits[id].req()) {
      this.permits[id].buy();
      this.boughtPermits.push(id);
      this.permits[id].func();

      DisplayFunctions.elClass(`permit-${id}`, "bought", "add");
      DisplayFunctions.elOnClick(`permit-${id}`, () => {});
    }
  },
  permits: {
    0: {
      buy: () => (money = money.sub(250)),
      func: () => allowedFish.push("lake"),
      req: () => money.gte(250),
    },
  },
};
