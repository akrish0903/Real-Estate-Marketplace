const UserAuthModel = require("../models/UserAuthModel");
const UserPropertiesModel = require("../models/UserPropertiesModel");
const httpErrors = require("http-errors");

const addPropertyController = async (req, res, next) => {
    var userId = req.payload.aud;
    var {
        userListingType,
        usrListingName,
        usrListingDescription,
        usrListingSquareFeet,
        location,
        usrAmenities,
        usrExtraFacilities,
        usrPrice,
        userListingImage
    } = req.body;

    try {
        var fetchedUserData = await UserAuthModel.findById(userId);
        if (fetchedUserData.usrType === "agent") {
            const newPropertySetup = new UserPropertiesModel({
                agentId: userId,
                userListingType,
                usrListingName,
                usrListingDescription,
                usrListingSquareFeet,
                location,
                usrAmenities,
                usrExtraFacilities,
                usrPrice,
                userListingImage,
                usrPropertyTime: new Date(),
                usrPropertyFavorites: 0,
                usrPropertyLiveStatus: true,
                usrPropertySoldTime: null
            });
            var savedUserDetails = await newPropertySetup.save();
            res.status(200).json({
                message: "Property added Success.",
                user_property_details: savedUserDetails
            });
        } else {
            next(httpErrors.Unauthorized("Invalid UserType"))
        }

    } catch (error) {
        next(httpErrors.BadRequest())
    }
}

const showBuyerFourRecentPropertyController = async (req, res, next) => {

    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);

    if (fetchedUserData.usrType === "buyer"  || fetchedUserData.usrType === null) {

        try {
            const usrPropertiesArr = limit
                ? await UserPropertiesModel.find().sort({ usrPropertyTime: -1 }).limit(limit)
                : await UserPropertiesModel.find().sort({ usrPropertyTime: -1 });
            res.status(200).json({
                message: "Property record fetched success.",
                user_property_arr: usrPropertiesArr
            });
        } catch (error) {
            next(httpErrors.BadRequest())
        }
    }
}

const showBuyerTwoFeaturesPropertyController = async (req, res, next) => {
    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);

    // Ensure only "buyer" or if user type is not set can access this feature
    if (fetchedUserData.usrType === "buyer" || fetchedUserData.usrType === null) {
        try {
            // Fetch the two properties with the highest price, sorting by usrPrice in descending order
            const topProperties = limit
                ? await UserPropertiesModel.find().sort({ usrPrice: -1 }).limit(limit)
                : await UserPropertiesModel.find().sort({ usrPrice: -1 });

            console.log("Fetched properties (sorted by price):", topProperties); // Debugging log

            res.status(200).json({
                message: "Top properties fetched successfully.",
                user_property_arr: topProperties
            });
        } catch (error) {
            console.error("Error fetching top properties: ", error);
            next(httpErrors.BadRequest());
        }
    } else {
        res.status(403).json({
            message: "You are not authorized to view this resource."
        });
    }
}


const showBuyerPropertyController = async (req, res, next) => {

    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);

    if (fetchedUserData.usrType === "buyer") {
        try {
            const usrPropertiesArr = await UserPropertiesModel.find().sort({ usrPropertyTime: -1 });
            res.status(200).json({
                message: "All property records fetched successfully.",
                user_property_arr: usrPropertiesArr
            });
        } catch (error) {
            next(httpErrors.BadRequest())
        }
    }
}

const showAdimFourRecentPropertyController = async (req, res, next) => {

    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);
    if (fetchedUserData.usrType === "admin") {
        try {
            const usrPropertiesArr = limit
                ? await UserPropertiesModel.find().sort({ usrPropertyTime: -1 }).limit(limit)
                : await UserPropertiesModel.find().sort({ usrPropertyTime: -1 });
            res.status(200).json({
                message: "Property record fetched success.",
                user_property_arr: usrPropertiesArr
            });
        } catch (error) {
            next(httpErrors.BadRequest())
        }
    }
}

const showAgentRecentPropertyController = async (req, res, next) => {
    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);
    
    try {
        if (fetchedUserData.usrType === "agent") {
            const  agentId  = userId;
            const usrPropertiesArr = limit
                ? await UserPropertiesModel.find({ agentId }).sort({ usrPropertyTime: -1 }).limit(limit)
                : await UserPropertiesModel.find({ agentId }).sort({ usrPropertyTime: -1 });

            res.status(200).json({
                message: "Property record fetched successfully.",
                user_property_arr: usrPropertiesArr
            });
        } else {
            return next(httpErrors.Unauthorized("Your Property record fetched success."));
        }
    } catch (error) {
        next(httpErrors.BadRequest());
    }
};

const showAgentPropertyController = async (req, res, next) => {
    var userId = req.payload.aud;
    var { limit } = req.body;
    var fetchedUserData = await UserAuthModel.findById(userId);
    
    try {
        if (fetchedUserData.usrType === "agent") {
            const agentId = userId;
            const usrPropertiesArr = limit
                ? await UserPropertiesModel.find({ agentId }).sort({ usrPropertyTime: -1 })
                : await UserPropertiesModel.find({ agentId }).sort({ usrPropertyTime: -1 });

            res.status(200).json({
                message: "All property records fetched successfully.",
                user_property_arr: usrPropertiesArr
            });
        } else {
            return next(httpErrors.Unauthorized("You are not authorized to view these properties."));
        }
    } catch (error) {
        next(httpErrors.BadRequest());
    }
};

module.exports = { addPropertyController, showBuyerFourRecentPropertyController, showBuyerTwoFeaturesPropertyController, showBuyerPropertyController, showAdimFourRecentPropertyController, showAgentRecentPropertyController, showAgentPropertyController }