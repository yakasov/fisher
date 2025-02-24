const UPGRADES = {
  "fishingdelay": {
    "bought": 0,
    "cost": (n) => new Decimal(5 * (2 ** n)),
  }
}