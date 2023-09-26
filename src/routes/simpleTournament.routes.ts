import express from "express";
import SimpleTournamentController from "../controllers/simplesTournament.controller";

const router = express.Router();

router.post("/tournament", SimpleTournamentController.createTournament);
router.put("/tournament/winner", SimpleTournamentController.updateFinalWinner);
router.delete("/tournament", SimpleTournamentController.deleteTournament);
router.post(
  "/tournament/game",
  SimpleTournamentController.addTennisGameToPhase
);
router.put(
  "/tournament/game",
  SimpleTournamentController.updateTennisGameInPhase
);

export { router };
