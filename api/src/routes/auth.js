const express = require("express");
const router = express.Router();

const loginController = require("../controllers/auth/login");
const logoutController = require("../controllers/auth/logout");
const registerController = require("../controllers/auth/createUser");



/**
 * @openapi
 *
 *   description: API endpoints for user authentication
 * 
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user.
 *         password:
 *           type: string
 *           description: Password of the user.
 *       example:
 *         username: john_doe
 *         password: johndoe123
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /login:
 *   post:
 *     summary: Login to the system
 *     description: Logs in a user with a valid username and password
 *     tags: [api/v1/auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating the status of the request
 *                   example: success
 *                 token:
 *                   type: string
 *                   description: JSON Web Token used for authorization
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG4iLCJpYXQiOjE2MjAxMTg4MjUsImV4cCI6MTYyMDExOTAyNX0.-0B4h3t9hL_jedHgOVvEvpWc8yZLxoeZt72wvF0g2W8
 *       401:
 *         description: Invalid credentials
 */


router.post("/login", loginController.loginPost);


/**
 * @openapi
 *   description: User authentication and authorization operations
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /logout:
 *  post:
 *     tags:
 *       - api/v1/auth
 *     summary: Logout the current user
 *     description: Invalidates the current JWT access token, logging out the current user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: JWT revoked successfully
 *       401:
 *         description: Unauthorized - missing or invalid JWT access token
 *       500:
 *         description: Internal server error
 */
router.post("/logout", logoutController.logoutPost);



/**
 * @openapi
 * /createUser:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user in the system
 *     tags: [api/v1/auth]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *               role:
 *                 type: string
 *                 description: Role of the user (must be user or admin).
 *               username:
 *                 type: string
 *                 description: Username of the user.
 *               english_level:
 *                 type: string
 *                 description: English level of the user.
 *               cv_url:
 *                 type: string
 *                 description: URL to the user's CV.
 *             required:
 *               - email
 *               - password
 *               - role
 *               - username
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: Role must be user or admin
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                   example: An error occurred while creating the user
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       summary: User object
 *       description: This object represents a registered user in the system
 *       properties:
 *         email:
 *           type: string
 *           description: Email of the user.
 *         password:
 *           type: string
 *           description: Password of the user.
 *         role:
 *           type: string
 *           description: Role of the user (must be user or admin).
 *         username:
 *           type: string
 *           description: Username of the user.
 *         english_level:
 *           type: string
 *           description: English level of the user.
 *         cv_url:
 *           type: string
 *           description: URL to the user's CV.
 *       example:
 *         email: john_doe@example.com
 *         password: johndoe123
 *         role: user
 *         username: john_doe
 *         english_level: intermediate
 *         cv_url: https://example.com/john_doe_cv.pdf
 */


router.post("/createUser", registerController.registerPost);

module.exports = router;

//! $2b$10$NMOtimy6leyBaKXD.aUvQusNW5tL45PwPJrI.7BV9Id07w3PF8JHG