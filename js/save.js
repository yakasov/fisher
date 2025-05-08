function createSave() {
  const upgradesToSave = {};
  const permanentsToSave = {};

  Object.entries(UPGRADES).forEach(([k, v]) => (upgradesToSave[k] = v.bought));
  Object.entries(PERMANENTS).forEach(
    ([k, v]) => (permanentsToSave[k] = v.bought)
  );

  return {
    allowedFish,
    craftables: JSON.stringify(craftables),
    fish,
    money,
    permanentsToSave,
    permits: JSON.stringify(Permits.boughtPermits),
    saveTime: Math.floor(Date.now() / 1000),
    upgradesToSave,
  };
}

function saveGame() {
  localStorage.setItem("fisherSave", btoa(JSON.stringify(createSave())));
}

function loadGame() {
  const rawSave = localStorage.getItem("fisherSave");
  if (!rawSave) return;

  const loadedSave = JSON.parse(atob(rawSave));

  allowedFish = loadedSave.allowedFish;
  craftables = JSON.parse(loadedSave.craftables);
  Object.entries(loadedSave.fish).forEach(([k, v]) => (fish[k] = v));
  money = new Decimal(loadedSave.money);
  Permits.boughtPermits = JSON.parse(loadedSave.permits);
  Object.entries(loadedSave.permanentsToSave).forEach(
    ([k, v]) => (PERMANENTS[k].bought = v)
  );
  Object.entries(loadedSave.upgradesToSave).forEach(
    ([k, v]) => (UPGRADES[k].bought = v)
  );

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
    localStorage.remove("fisherSave");
    location.reload();
  }
}
