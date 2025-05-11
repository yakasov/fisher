function createSave() {
  const permanentsToSave = {};

  Object.entries(PERMANENTS).forEach(
    ([k, v]) => (permanentsToSave[k] = v.bought)
  );

  return {
    allowedFish: Player.allowedFish,
    craftables: JSON.stringify(Player.craftables),
    fish: Player.fish,
    money: Player.money.toString(),
    permanentsToSave,
    permits: JSON.stringify(Permits.boughtPermits),
    saveTime: Math.floor(Date.now() / 1000),
    scrap: Player.scrap,
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
    ([k, v]) => (PERMANENTS[k].bought = v)
  );
  Player.upgrades = JSON.parse(loadedSave.upgrades);

  loadPermits();
}

function loadPermits() {
  Permits.boughtPermits.forEach((p) => {
    DisplayFunctions.elClass(`permit-${p}`, "bought", "add");
    DisplayFunctions.elOnClick(`permit-${p}`, () => {});
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
