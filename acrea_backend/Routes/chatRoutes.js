// /acrea_backend/routes/chatRoutes.js
const express = require('express');
const httpErrors = require("http-errors");
const { jwt_verify_token } = require('../utils/jwt_utils');
const chatController = require("../controller/chatController")
const router = express.Router();

router.get('/buyer/:buyerId', jwt_verify_token, chatController.getChatsByBuyer);
router.post('/', jwt_verify_token,chatController.createChat);
router.post('/:chatId/message', jwt_verify_token,chatController.addMessage);

module.exports = router;
