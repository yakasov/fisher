let Tournaments = {
  exit: (force = false) => {
    if (!Player.tournaments.currentChallenge) return;

    if (
      force ||
      Tournaments.tournaments[Player.tournaments.currentChallenge].fail()
    ) {
      Player.tournaments.currentChallenge = null;
    }
  },
  start: (id) => {
    Player.reset();
    Player.tournaments.currentChallenge = id;
    Player.tournaments.timeElapsed = 0;
    Player.tournaments.timeStarted = Date.now() / 1000;
  },
  tournaments: {
    speedFishing: {
      fail: () => Player.tournaments.timeElapsed >= 60,
      goal: () => Player.fishLength() >= 40,
      warning: () =>
        `Time remaining: ${f(60 - Player.tournaments.timeElapsed)}s`,
    },
    scrapCollector: {
      goal: () => true,
    },
    bigHaul: {
      goal: () => true,
    },
  },
};
