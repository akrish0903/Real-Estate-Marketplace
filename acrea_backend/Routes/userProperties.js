const express = require('express');
const httpErrors = require("http-errors");
const router = express.Router();
const { jwt_verify_token } = require('../utils/jwt_utils');
const UserPropertiesController = require("../controller/UserPropertiesController")

// To add property redirect to AddProperty Page
router.post("/add-properties", jwt_verify_token, UserPropertiesController.addPropertyController)

// show buyer four recent properties in Dashboard when Buyer logged in
router.post("/show-buyer-four-recent-properties", jwt_verify_token, UserPropertiesController.showBuyerFourRecentPropertyController)

// show agent agent's four recent properties in Dashboard when Agent logged in
router.post("/show-agent-four-recent-properties", jwt_verify_token, UserPropertiesController.showAgentRecentPropertyController)

// show buyer two feature properties in Dashboard when Buyer logged in
router.post("/show-buyer-two-feature-properties", jwt_verify_token, UserPropertiesController.showBuyerTwoFeaturesPropertyController)

// show admin four recent properties in Dashboard when Admin logged in
router.post("/show-admin-four-recent-properties", jwt_verify_token, UserPropertiesController.showAdimFourRecentPropertyController)

//shows all properties to admin in ViewAllProperties page
router.post("/show-admin-properties", jwt_verify_token, UserPropertiesController.showAdimFourRecentPropertyController)

//show all agent's properties in ViewAllProperties page
router.post("/show-agent-properties",jwt_verify_token, UserPropertiesController.showAgentPropertyController)

//shows all properties to buyers in ViewAllProperties page
router.post("/show-buyer-properties", jwt_verify_token, UserPropertiesController.showBuyerPropertyController)

// show agent agent's two recent properties in Dashboard when Agent logged in
router.post("/show-agent-two-recent-properties", jwt_verify_token, UserPropertiesController.showAgentRecentPropertyController)

module.exports = router;