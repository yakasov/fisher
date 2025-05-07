let CraftFunctions = {
  craft: function (recipe) {
    switch (recipe) {
      case "scraptometal":
        if (fish.scrap >= 5) {
          fish.scrap = fish.scrap - 5;
          fish.metal = (fish.metal ?? 0) + 1;
        }
        break;
      case "rusttometal":
        if (fish.rust >= 3) {
          fish.rust = fish.rust - 3;
          fish.metal = (fish.metal ?? 0) + 1;
        }
        break;
      case "metalfisher":
        if (fish.metal >= this.craftCost('metalfisher')) {
          fish.metal = fish.metal - this.craftCost('metalfisher');
          craftables.metalfisher = craftables.metalfisher + 1;
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
        return 3 + craftables.metalfisher;
      default:
        return 0;
    }
  },
};
