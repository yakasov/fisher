function craft(recipe) {
  switch (recipe) {
    case "scraptometal":
      if (fish.scrap >= 5) {
        fish.scrap = fish.scrap - 5;
        fish.metal = fish.metal + 1;
      }
      break;
    case "rusttometal":
      if (fish.rust >= 3) {
        fish.rust = fish.rust - 3;
        fish.metal = fish.metal + 1;
      }
      break;
    default:
      break;
  }

  updateOnDemand();
}
