let CraftFunctions = {
  craft: function (recipe) {
    switch (recipe) {
      case "scraptometal":
        if (Player.scrap.scrap >= 5) {
          Player.scrap.scrap = Player.scrap.scrap - 5;
          Player.scrap.metal = (Player.scrap.metal ?? 0) + 1;
        }
        break;
      case "rusttometal":
        if (Player.scrap.rust >= 3) {
          Player.scrap.rust = Player.scrap.rust - 3;
          Player.scrap.metal = (Player.scrap.metal ?? 0) + 1;
        }
        break;
      case "alltometal":
        while (Player.scrap.scrap >= 5 || Player.scrap.rust >= 3) {
          this.craft("scraptometal");
          this.craft("rusttometal");
        }
        break;
      case "metalfisher":
        if (Player.scrap.metal >= this.craftCost("metalfisher")) {
          Player.scrap.metal = Player.scrap.metal - this.craftCost("metalfisher");
          Player.craftables.metalfisher = Player.craftables.metalfisher + 1;
          auto.metalfisher = currentTime + Effects.autofishingInterval();
        }
        break;
      default:
        break;
    }

    DisplayFunctions.updateOnDemand();
  },
  craftCost: function (recipe) {
    switch (recipe) {
      case "scraptometal":
        return 5;
      case "rusttometal":
        return 3;
      case "metalfisher":
        return Math.floor(3 + Player.craftables.metalfisher ** 1.5);
      default:
        return 0;
    }
  },
};
