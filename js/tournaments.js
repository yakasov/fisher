let Tournaments = {
  start: (id) => {
    Player.reset();
    Player.tournaments.timeElapsed = 0;
  },
  tournaments: {
    speedFishing: {
      goal: () =>
        Player.fishLength() >= 40 && Player.tournaments.timeElapsed <= 60,
    },
    scrapCollector: {
      goal: () => true,
    },
    bigHaul: {
      goal: () => true,
    },
  },
};
