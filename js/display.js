let DisplayFunctions = {
  elInner: function (elName, type, content) {
    let el = document.getElementById(elName);
    if (type === "text") el.innerText = content;
    else if (type === "html") el.innerHTML = content;
  },
  elDisabled: function (elName, disabled) {
    if (disabled) {
      document.getElementById(elName).setAttribute("disabled", "");
    } else {
      document.getElementById(elName).removeAttribute("disabled");
    }
  },
  elClass: function (elName, className, type) {
    let el = document.getElementById(elName);
    if (type === "remove") {
      el.classList.remove(className);
    } else if (type === "add") {
      el.classList.add(className);
    }
  },
  elOnClick: function (elName, func) {
    document.getElementById(elName).onclick = func;
  },
  getFishDisplay: function (type) {
    const dict = type === "scrap" ? SCRAP_DICT : FISH_DICT;
    const scrapOrFish = type === "scrap" ? Player.scrap : Player.fish;

    let itemsArray = Object.entries(scrapOrFish)
      .filter(([itemName]) => dict[itemName]?.type === type)
      .sort(([aName], [bName]) => {
        const aDisplayName =
          dict[aName].name ?? aName.charAt(0).toUpperCase() + aName.slice(1);
        const bDisplayName =
          dict[bName].name ?? bName.charAt(0).toUpperCase() + bName.slice(1);
        return aDisplayName.localeCompare(bDisplayName);
      });

    let text = "";
    itemsArray.forEach(([itemName, itemAmount]) => {
      const upperItemName =
        dict[itemName].name ??
        itemName.charAt(0).toUpperCase() + itemName.slice(1);
      text += `
      <div class="fish-line">
        <div class="fish-info">
          <img src="images/${itemName}.png" class="fish-img" />
          <span class="fish-name">${upperItemName}</span>
          <span class="fish-amount">${itemAmount}</span>
        </div>
        <button class="fish-sell-btn" onclick="FishFunctions.sellFish('${itemName}')" ${
        itemAmount === 0 || dict[itemName].noSell ? 'disabled=""' : ""
      }>${
        dict[itemName].noSell
          ? "Cannot sell"
          : "Sell for " +
            f(dict[itemName].value * Effects.fishingValueMult()) +
            "$"
      }</button></div>`;
    });

    return text;
  },
  updateDisplays: function () {
    this.elInner("money-display", "text", `You have ${f(Player.money)}$.`);
    this.elInner(
      "fish-count-display",
      "text",
      `You have ${Player.fishLength()} fish.`
    );
    this.elInner(
      "fish-delay",
      "text",
      `Fishing recharge: ${f(
        FishFunctions.fishingRecharge
      )}s\nMax recharge: ${f(Effects.fishingDelay())}s${
        Player.craftables.metalfisher > 0
          ? "\nAuto-fishing every " + f(Effects.autofishingInterval()) + "s"
          : ""
      }`
    );
    this.elInner(
      "fish-max-display",
      "html",
      `You can hold up to ${Effects.fishMax()} fish.${
        PERMANENTS.scrapfishing.bought
          ? `<br />This also lets you hold up to ${Effects.scrapMax()} scrap items.`
          : ""
      }`
    );

    this.elInner(
      "prestige-gain",
      "html",
      `You can Prestige for <b>${PrestigeFunctions.prestigeGain()} Prestige Points.</b>`
    );
    this.elInner(
      "prestige-points",
      "text",
      `You have ${f(Player.prestigePoints, 0)} Prestige Points.`
    );
  },
  updateOnDemand: function () {
    this.elInner("normal-amounts", "html", this.getFishDisplay("normal"));
    this.elInner("lake-amounts", "html", this.getFishDisplay("lake"));
    this.elInner("scrap-amounts", "html", this.getFishDisplay("scrap"));
    this.elDisabled("sellall-button", Player.fishLength() === 0);

    this.elInner(
      "fishingdelay-upgrade",
      "text",
      `Buy for ${f(UPGRADES.fishingdelay())}$`
    );
    this.elInner(
      "fishingvalue-upgrade",
      "text",
      `Buy for ${f(UPGRADES.fishingvalue())}$`
    );
    this.elInner(
      "fishingcapacity-upgrade",
      "text",
      `Buy for ${f(UPGRADES.fishingcapacity())}$`
    );
    this.elInner(
      "metalfisheroverclock-upgrade",
      "text",
      `Buy for ${f(UPGRADES.metalfisheroverclock())}$`
    );

    this.elInner(
      "fishingdelay-mult",
      "text",
      `( ${f(Effects.fishingDelay() / 3)}x )`
    );
    this.elInner(
      "fishingvalue-mult",
      "text",
      `( ${f(Effects.fishingValueMult())}x )`
    );
    this.elInner(
      "fishingcapacity-bonus",
      "text",
      `( +${f(Effects.fishBucketSize())} )`
    );
    this.elInner(
      "metalfisheroverclock-mult",
      "text",
      `( ${f(Effects.metalfisherOverclock())}x )`
    );

    this.elInner(
      "crafting-metalfisher-amount",
      "text",
      `${Player.craftables.metalfisher} Handmade Fisher${
        Player.craftables.metalfisher === 1 ? "" : "s"
      }`
    );
    this.elInner(
      "crafting-metalfisher-button",
      "text",
      `Craft for ${CraftFunctions.craftCost("metalfisher")} Metal`
    );

    if (PERMANENTS.scrapfishing.bought) {
      this.elDisabled("scrapfishing-upgrade", true);
      this.elInner("scrapfishing-upgrade", "text", "Bought!");

      this.elClass("crafting-scraprecipes", "hidden", "remove");
      this.elClass("crafting-automaticfishers", "hidden", "remove");
    }

    if (Permits.hasPermit(0)) {
      this.elClass("prestige-tab-button", "hidden", "remove");
    }

    this.elInner(
      "prestige_cheaperupgrades-upgrade",
      "text",
      `Buy for ${f(UPGRADES.prestige_cheaperupgrades())} PP`
    );
    this.elInner(
      "prestige_bonusfishchance-upgrade",
      "text",
      `Buy for ${f(UPGRADES.prestige_bonusfishchance())} PP`
    );
  },
};
