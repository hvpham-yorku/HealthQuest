/**
 * @swagger
 * tags:
 *   name: SecureRoutes
 *   description: Routes for secure access
 */
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/secure-routes:
 *   get:
 *     summary: Access secure routes
 *     tags: [SecureRoutes]
 *     responses:
 *       200:
 *         description: Successful access message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Welcome to the secure routes
 */
router.get('/', (req, res) => {
    res.send('Welcome to the secure routes');
});

module.exports = router;
