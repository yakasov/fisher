function createSave() {
  const upgradesToSave = {};
  const permanentsToSave = {};

  Object.entries(UPGRADES).forEach(([k, v]) => (upgradesToSave[k] = v.bought));
  Object.entries(PERMANENTS).forEach(
    ([k, v]) => (permanentsToSave[k] = v.bought)
  );

  return {
    allowedFish,
    auto: JSON.stringify(auto),
    craftables: JSON.stringify(craftables),
    fish,
    money,
    permanentsToSave,
    saveTime: Math.floor(Date.now() / 1000),
    upgradesToSave,
  };
}

function saveGame() {
  localStorage.setItem("save", btoa(JSON.stringify(createSave())));
}

function loadGame() {
  const rawSave = localStorage.getItem("save");
  if (!rawSave) return;

  const loadedSave = JSON.parse(atob(rawSave));

  allowedFish = loadedSave.allowedFish;
  //auto = JSON.parse(loadedSave.auto);
  craftables = JSON.parse(loadedSave.craftables);
  Object.entries(loadedSave.fish).forEach(([k, v]) => (fish[k] = v));
  money = new Decimal(loadedSave.money);
  Object.entries(loadedSave.permanentsToSave).forEach(
    ([k, v]) => (PERMANENTS[k].bought = v)
  );
  Object.entries(loadedSave.upgradesToSave).forEach(
    ([k, v]) => (UPGRADES[k].bought = v)
  );
}
