import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /api/check/ping:
 *   get:
 *     summary: Ping the server
 *     responses:
 *       200:
 *         description: Pong!
 */
router.get("/ping", (req, res) => {
    res.send("pong");
});

export default router;
