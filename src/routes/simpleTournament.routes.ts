import express from 'express';
import SimpleTournamentController from "../controllers/simplesTournament.controller";

const router = express.Router();

router.post('/tournament', SimpleTournamentController.createTournament);
router.put('/tournament/:tournamentId', SimpleTournamentController.updateFinalWinner);
router.delete('/tournament/:tournamentId', SimpleTournamentController.deleteTournament);
router.post('/tournament/:tournamentId/:side/:phaseIndex', SimpleTournamentController.addTennisGameToPhase);
router.put('/tournament/:tournamentId/:side/:phaseIndex/:gameIndex', SimpleTournamentController.updateTennisGameInPhase);

export { router };
