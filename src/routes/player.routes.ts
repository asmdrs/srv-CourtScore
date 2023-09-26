import express from "express";
import PlayerController from "../controllers/player.controller";

const router = express.Router();

router.post("/player", PlayerController.createPlayer);
router.get("/player", PlayerController.getPlayersByGroup);
router.put("/player", PlayerController.updatePlayer);
router.delete("/player", PlayerController.deletePlayer);

export { router };
