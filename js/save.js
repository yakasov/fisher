function createSave() {
  const permanentsToSave = {};

  Object.entries(Upgrades.permanents).forEach(
    ([k, v]) => (permanentsToSave[k] = v.bought)
  );

  return {
    allowedFish: Player.allowedFish,
    craftables: JSON.stringify(Player.craftables),
    fish: Player.fish,
    money: Player.money.toString(),
    permanentsToSave,
    permits: JSON.stringify(Permits.boughtPermits),
    prestigePoints: Player.prestigePoints.toString(),
    totalPrestigePoints: Player.totalPrestigePoints.toString(),
    tournaments: JSON.stringify(Player.tournaments),
    saveTime: Math.floor(Date.now() / 1000),
    scrap: Player.scrap,
    stats: JSON.stringify(Player.stats),
    upgrades: JSON.stringify(Player.upgrades),
  };
}

function saveGame() {
  localStorage.setItem("fisherSave", btoa(JSON.stringify(createSave())));
}

function loadGame() {
  const rawSave = localStorage.getItem("fisherSave");
  if (!rawSave) return;

  const loadedSave = JSON.parse(atob(rawSave));

  Player.allowedFish = loadedSave.allowedFish;
  Player.craftables = JSON.parse(loadedSave.craftables);
  Object.entries(loadedSave.fish).forEach(([k, v]) => (Player.fish[k] = v));
  Object.entries(loadedSave.scrap).forEach(([k, v]) => (Player.scrap[k] = v));
  Player.money = new Decimal(loadedSave.money);
  Permits.boughtPermits = JSON.parse(loadedSave.permits);
  Object.entries(loadedSave.permanentsToSave).forEach(
    ([k, v]) => (Upgrades.permanents[k].bought = v)
  );
  Player.prestigePoints = new Decimal(loadedSave.prestigePoints);
  Player.saveTime = loadedSave.saveTime;
  Player.stats = JSON.parse(loadedSave.stats ?? "{}");
  Player.totalPrestigePoints = new Decimal(loadedSave.totalPrestigePoints);
  Player.tournaments = JSON.parse(loadedSave.tournaments ?? "{}");
  Player.upgrades = JSON.parse(loadedSave.upgrades);

  const currentTime = Math.floor(Date.now() / 1000);
  const timePassed = (currentTime - loadedSave.saveTime) * 10;

  for (let i = 0; i < timePassed; i++) {
    gameLoop(false);
  }

  loadPermits();
  Prestige.checkMilestones();
}

function loadPermits() {
  Permits.boughtPermits.forEach((p) => {
    Display.elClass(`permit-${p}`, "bought", "add");
    Display.elOnClick(`permit-${p}`, () => {});
  });
}

function exportSave() {
  saveGame();
  document.getElementById("save-data").value =
    localStorage.getItem("fisherSave") || "";
}

function importSave() {
  const data = document.getElementById("save-data").value.trim();
  if (!data) return alert("Paste your save data first!");
  localStorage.setItem("fisherSave", data);
  location.reload();
}

function resetSave() {
  if (
    confirm("Are you sure you want to reset your save? This cannot be undone!")
  ) {
    localStorage.removeItem("fisherSave");
    location.reload();
  }
}
